pragma solidity ^0.8.0;

interface IERC721Category {

    /**
     * @dev Sets the category for token at index
     */
    function setTokenCategoryByIndex(uint256 category, uint256 index) internal;

    /**
     * @dev Gets the category for token at index
     */
    function getTokenCategoryByIndex(uint256 index) internal returns (uint256);

}
