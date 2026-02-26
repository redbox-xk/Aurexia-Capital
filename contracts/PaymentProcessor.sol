// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./interfaces/IOPMToken.sol";
import "./interfaces/ITreasury.sol";

contract PaymentProcessor is AccessControl, ReentrancyGuard, Pausable {
    using SafeERC20 for IERC20;

    bytes32 public constant PROCESSOR_ROLE = keccak256("PROCESSOR_ROLE");
    bytes32 public constant FEE_SETTER_ROLE = keccak256("FEE_SETTER_ROLE");

    struct PaymentRequest {
        address payer;
        address payee;
        address token;
        uint256 amount;
        uint256 fee;
        uint256 timestamp;
        bool processed;
        string reference;
    }

    struct MerchantProfile {
        address treasury;
        uint256 feeTier;
        bool active;
        uint256 dailyVolume;
        uint256 lastReset;
        string metadata;
    }

    IOPMToken public opmToken;
    ITreasury public treasury;

    mapping(bytes32 => PaymentRequest) public payments;
    mapping(address => MerchantProfile) public merchants;

    uint256 public constant MAX_FEE = 500;
    uint256 public constant FEE_DENOMINATOR = 10000;
    uint256 public constant DAILY_LIMIT = 1000000 * 10**18;

    event PaymentInitiated(bytes32 indexed paymentId, address indexed payer, address indexed payee, uint256 amount);
    event PaymentCompleted(bytes32 indexed paymentId, address indexed payer, address indexed payee, uint256 amount);
    event MerchantRegistered(address indexed merchant, address treasury);

    constructor(address _opmToken, address _treasury) {
        require(_opmToken != address(0), "Payment: zero token");
        require(_treasury != address(0), "Payment: zero treasury");

        opmToken = IOPMToken(_opmToken);
        treasury = ITreasury(_treasury);

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PROCESSOR_ROLE, msg.sender);
        _grantRole(FEE_SETTER_ROLE, msg.sender);
    }

    function registerMerchant(address merchant, address merchantTreasury, string calldata metadata) external onlyRole(PROCESSOR_ROLE) {
        require(merchant != address(0), "Payment: zero merchant");
        require(!merchants[merchant].active, "Payment: already registered");

        merchants[merchant] = MerchantProfile({
            treasury: merchantTreasury,
            feeTier: 0,
            active: true,
            dailyVolume: 0,
            lastReset: block.timestamp,
            metadata: metadata
        });

        emit MerchantRegistered(merchant, merchantTreasury);
    }

    function initiatePayment(address payer, address payee, address token, uint256 amount, string calldata reference) external whenNotPaused nonReentrant returns (bytes32) {
        require(merchants[payee].active, "Payment: merchant inactive");
        require(amount > 0, "Payment: zero amount");
        require(token == address(opmToken), "Payment: OPM only");

        _resetDailyVolume(payee);

        uint256 fee = _calculateFee(payee, amount);
        uint256 netAmount = amount - fee;

        require(merchants[payee].dailyVolume + netAmount <= DAILY_LIMIT, "Payment: daily limit exceeded");

        bytes32 paymentId = keccak256(abi.encodePacked(payer, payee, amount, block.timestamp, reference));

        PaymentRequest storage request = payments[paymentId];
        request.payer = payer;
        request.payee = payee;
        request.token = token;
        request.amount = amount;
        request.fee = fee;
        request.timestamp = block.timestamp;
        request.reference = reference;

        emit PaymentInitiated(paymentId, payer, payee, amount);

        return paymentId;
    }

    function completePayment(bytes32 paymentId) external whenNotPaused nonReentrant {
        PaymentRequest storage request = payments[paymentId];
        require(!request.processed, "Payment: already processed");
        require(request.payer != address(0), "Payment: not found");

        IERC20(request.token).safeTransferFrom(request.payer, request.payee, request.amount);

        if (request.fee > 0) {
            IERC20(request.token).safeTransferFrom(request.payer, address(this), request.fee);
            IERC20(request.token).approve(address(treasury), request.fee);
            treasury.collectFee(request.token, request.fee, request.payee);
        }

        merchants[request.payee].dailyVolume += request.amount - request.fee;
        request.processed = true;

        emit PaymentCompleted(paymentId, request.payer, request.payee, request.amount);
    }

    function _calculateFee(address merchant, uint256 amount) internal view returns (uint256) {
        uint256 feePercentage = treasury.getMerchantFee(merchant);
        if (feePercentage == 0) return 0;
        return (amount * feePercentage) / FEE_DENOMINATOR;
    }

    function _resetDailyVolume(address merchant) internal {
        if (block.timestamp - merchants[merchant].lastReset > 1 days) {
            merchants[merchant].dailyVolume = 0;
            merchants[merchant].lastReset = block.timestamp;
        }
    }

    function setMerchantFeeTier(address merchant, uint256 feeTier) external onlyRole(FEE_SETTER_ROLE) {
        require(merchants[merchant].active, "Payment: merchant inactive");
        merchants[merchant].feeTier = feeTier;
    }

    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }
}
