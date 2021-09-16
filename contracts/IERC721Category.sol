// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC721Category {

    /**
     * @dev Sets the category for token at index
     */
    function _setTokenCategoryByIndex(uint256 index, string memory category) external;

    /**
     * @dev Gets the category for token at index
     */
    function getTokenCategoryByIndex(uint256 index) external returns (string memory);

}
