// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC721Category.sol";

contract ERC721Category is IERC721Category {

    // Mapping from token id to category
    mapping(uint256 => string) private _tokenCategories;

    /**
     * @dev Sets the category for token at index
     */
    function _setTokenCategoryByIndex(uint256 index, string memory category) override public
    {
        _tokenCategories[index] = category;
    }

    /**
     * @dev Gets the category for token at index
     */
    function getTokenCategoryByIndex(uint256 index) override public view returns (string memory){
        return _tokenCategories[index];
    }

}
