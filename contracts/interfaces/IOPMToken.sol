// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IOPMToken is IERC20 {
    function mint(address to, uint256 amount) external;
    function burn(uint256 amount) external;
    function pause() external;
    function unpause() external;
    function blacklist(address account) external;
    function unblacklist(address account) external;
    function isBlacklisted(address account) external view returns (bool);
    function isLocked(address account) external view returns (bool);
    function getLockEndTime(address account) external view returns (uint256);
}
