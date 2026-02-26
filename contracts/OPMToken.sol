// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract OPMToken is ERC20, ERC20Burnable, AccessControl, Pausable, ERC20Permit, ERC20Votes {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant BLACKLISTER_ROLE = keccak256("BLACKLISTER_ROLE");

    uint256 private constant INITIAL_SUPPLY = 10000 * 10**18;
    uint256 public constant MAX_SUPPLY = 10000 * 10**18;

    mapping(address => bool) private _blacklisted;
    mapping(address => uint256) private _lastActivity;
    uint256 public constant ACTIVITY_TIMEOUT = 365 days;

    event Blacklisted(address indexed account);
    event Unblacklisted(address indexed account);
    event TokensMinted(address indexed to, uint256 amount);

    constructor(address initialAdmin) ERC20("OnePremium", "OPM") ERC20Permit("OnePremium") {
        require(initialAdmin != address(0), "OPM: zero address");

        _grantRole(DEFAULT_ADMIN_ROLE, initialAdmin);
        _grantRole(MINTER_ROLE, initialAdmin);
        _grantRole(PAUSER_ROLE, initialAdmin);
        _grantRole(BLACKLISTER_ROLE, initialAdmin);

        _mint(initialAdmin, INITIAL_SUPPLY);
        _lastActivity[initialAdmin] = block.timestamp;
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function blacklist(address account) public onlyRole(BLACKLISTER_ROLE) {
        require(!_blacklisted[account], "OPM: already blacklisted");
        _blacklisted[account] = true;
        emit Blacklisted(account);
    }

    function unblacklist(address account) public onlyRole(BLACKLISTER_ROLE) {
        require(_blacklisted[account], "OPM: not blacklisted");
        _blacklisted[account] = false;
        emit Unblacklisted(account);
    }

    function isBlacklisted(address account) public view returns (bool) {
        return _blacklisted[account];
    }

    function _updateActivity(address account) internal {
        _lastActivity[account] = block.timestamp;
    }

    function getLockEndTime(address account) public view returns (uint256) {
        return _lastActivity[account] + ACTIVITY_TIMEOUT;
    }

    function isLocked(address account) public view returns (bool) {
        return block.timestamp < _lastActivity[account] + ACTIVITY_TIMEOUT;
    }

    function _update(address from, address to, uint256 value) internal override whenNotPaused {
        require(!_blacklisted[from] && !_blacklisted[to], "OPM: blacklisted");

        if (from != address(0) && to != address(0)) {
            require(!isLocked(from), "OPM: tokens are locked");
        }

        super._update(from, to, value);
        if (to != address(0)) {
            _updateActivity(to);
        }
    }
}
