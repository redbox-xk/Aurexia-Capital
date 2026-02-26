// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Treasury is AccessControl, ReentrancyGuard {
    using SafeERC20 for IERC20;

    bytes32 public constant FEE_COLLECTOR_ROLE = keccak256("FEE_COLLECTOR_ROLE");
    bytes32 public constant TREASURY_MANAGER_ROLE = keccak256("TREASURY_MANAGER_ROLE");

    struct FeeTier {
        uint256 minVolume;
        uint256 feePercentage;
        bool isActive;
    }

    mapping(address => uint256) public collectedFees;
    mapping(uint256 => FeeTier) public feeTiers;
    mapping(address => uint256) public merchantVolume;
    mapping(address => uint256) public merchantFeeTier;

    uint256 public totalFeesCollected;
    uint256 public feeTierCount;

    event FeesCollected(address indexed token, uint256 amount, address indexed merchant);
    event FeesWithdrawn(address indexed token, uint256 amount, address indexed to);
    event FeeTierUpdated(uint256 indexed tierId, uint256 minVolume, uint256 feePercentage);
    event MerchantTierUpdated(address indexed merchant, uint256 tierId);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(TREASURY_MANAGER_ROLE, msg.sender);

        _addFeeTier(0, 0);
        _addFeeTier(1000, 10);
        _addFeeTier(5000, 25);
        _addFeeTier(10000, 50);
    }

    function collectFee(address token, uint256 amount, address merchant) external onlyRole(FEE_COLLECTOR_ROLE) nonReentrant {
        require(amount > 0, "Amount must be > 0");

        IERC20(token).safeTransferFrom(msg.sender, address(this), amount);

        collectedFees[token] += amount;
        totalFeesCollected += amount;
        merchantVolume[merchant] += amount;

        _updateMerchantTier(merchant);

        emit FeesCollected(token, amount, merchant);
    }

    function withdrawFees(address token, uint256 amount, address to) external onlyRole(TREASURY_MANAGER_ROLE) nonReentrant {
        require(amount <= collectedFees[token], "Insufficient fees");

        collectedFees[token] -= amount;
        IERC20(token).safeTransfer(to, amount);

        emit FeesWithdrawn(token, amount, to);
    }

    function _addFeeTier(uint256 minVolume, uint256 feePercentage) internal {
        feeTiers[feeTierCount] = FeeTier({
            minVolume: minVolume,
            feePercentage: feePercentage,
            isActive: true
        });
        emit FeeTierUpdated(feeTierCount, minVolume, feePercentage);
        feeTierCount++;
    }

    function _updateMerchantTier(address merchant) internal {
        uint256 volume = merchantVolume[merchant];
        uint256 newTier = 0;

        for (uint256 i = 0; i < feeTierCount; i++) {
            if (feeTiers[i].isActive && volume >= feeTiers[i].minVolume) {
                newTier = i;
            }
        }

        if (merchantFeeTier[merchant] != newTier) {
            merchantFeeTier[merchant] = newTier;
            emit MerchantTierUpdated(merchant, newTier);
        }
    }

    function getMerchantFee(address merchant) external view returns (uint256) {
        uint256 tierId = merchantFeeTier[merchant];
        return feeTiers[tierId].feePercentage;
    }
}
