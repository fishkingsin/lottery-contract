// SPDX-License-Identifier: MIT

// Amended by HashLips
/**
    !Disclaimer!
    
    These contracts have been used to create tutorials,
    and was created for the purpose to teach people
    how to create smart contracts on the blockchain.
    please review this code on your own before using any of
    the following code for production.
    The developer will not be responsible or liable for all loss or 
    damage whatsoever caused by you participating in any way in the 
    experimental code, whether putting money into the contract or 
    using the code for your own project.
*/

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT1155 is ERC1155, Ownable {
    string public name;
    string public symbol;

    mapping(uint256 => string) public tokenURI;

    constructor() ERC1155("") {
        name = "HashItems";
        symbol = "HASHITEMS";
    }

    /**
     * Mints
     */
    function mint(
        address _to,
        uint256 _id,
        uint256 _amount
    ) public payable {
        // TODO: - safe id, amount, ref to BAYC contract
        _mint(_to, _id, _amount, "");
        /*require(saleIsActive, "Sale must be active to mint Ape");
        require(
            numberOfTokens <= maxApePurchase,
            "Can only mint 20 tokens at a time"
        );
        require(
            totalSupply().add(numberOfTokens) <= MAX_APES,
            "Purchase would exceed max supply of Apes"
        );
        require(
            apePrice.mul(numberOfTokens) <= msg.value,
            "Ether value sent is not correct"
        );

        for (uint256 i = 0; i < numberOfTokens; i++) {
            uint256 mintIndex = totalSupply();
            if (totalSupply() < MAX_APES) {
                safeMint(msg.sender, mintIndex);
            }
        }

        // If we haven't set the starting index and this is either 1) the last saleable token or 2) the first token to be sold after
        // the end of pre-sale, set the starting index block
        if (
            startingIndexBlock == 0 &&
            (totalSupply() == MAX_APES || block.timestamp >= REVEAL_TIMESTAMP)
        ) {
            startingIndexBlock = block.number;
        }*/
    }

    function safeMint(
        address _to,
        uint256 _id,
        uint256 _amount
    ) external onlyOwner {
        _mint(_to, _id, _amount, "");
    }

    function mintBatch(
        address _to,
        uint256[] memory _ids,
        uint256[] memory _amounts
    ) external onlyOwner {
        _mintBatch(_to, _ids, _amounts, "");
    }

    function burn(uint256 _id, uint256 _amount) external {
        _burn(msg.sender, _id, _amount);
    }

    function burnBatch(uint256[] memory _ids, uint256[] memory _amounts)
        external
    {
        _burnBatch(msg.sender, _ids, _amounts);
    }

    function burnForMint(
        address _from,
        uint256[] memory _burnIds,
        uint256[] memory _burnAmounts,
        uint256[] memory _mintIds,
        uint256[] memory _mintAmounts
    ) external onlyOwner {
        _burnBatch(_from, _burnIds, _burnAmounts);
        _mintBatch(_from, _mintIds, _mintAmounts, "");
    }

    function setURI(uint256 _id, string memory _uri) external onlyOwner {
        tokenURI[_id] = _uri;
        emit URI(_uri, _id);
    }

    function uri(uint256 _id) public view override returns (string memory) {
        return tokenURI[_id];
    }
}
