// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ITreasury {
    function collectFee(address token, uint256 amount, address merchant) external;
    function withdrawFees(address token, uint256 amount, address to) external;
    function getMerchantFee(address merchant) external view returns (uint256);
    function merchantVolume(address merchant) external view returns (uint256);
}
