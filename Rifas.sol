// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Rifa is ERC721, Ownable {
    uint256 public currentTokenId = 0;
    
    IERC20 public usdtToken;
    uint256 public nftPrice; // price for each NFT

    constructor(string memory name, string memory symbol, IERC20 _usdtToken, uint256 _nftPrice) ERC721(name, symbol) {
        usdtToken = _usdtToken;
        nftPrice = _nftPrice;
    }
    
    function mint(address to, uint256 numTokens) public onlyOwner {
        for(uint256 i = 0; i < numTokens; i++) {
            _mint(to, currentTokenId);
            currentTokenId++;
        }
    }

    function approveTo(address operator, uint256 tokenId) public onlyOwner {
        _approve(operator, tokenId);
    }

    function approveUSDT(uint256 amount) public onlyOwner {
        usdtToken.approve(address(this), amount);
    }

    function transferUSDT(address to, uint256 amount) public onlyOwner {
        usdtToken.transfer(to, amount);
    }
}


//Fabrica
contract ProjectRifasFactory is Ownable {

    IERC20 public usdtToken;
    uint256 public nftPrice; // price for each NFT

    constructor(IERC20 _usdtToken,uint256 _nftPrice) {
        usdtToken = _usdtToken;
        nftPrice = _nftPrice;
    }

   struct Project {
        Rifa rifa;
        string name;
        string symbol;
        uint256 mintedTokens;
        uint256 currentTokenId;
    }

    Project[] public projects;

    function createProject(string memory name, string memory symbol, uint256 numTokens) public onlyOwner returns (Project memory) {
        Rifa newRifa = new Rifa(name, symbol, usdtToken , 2);
        newRifa.mint(address(newRifa), numTokens); 
        Project memory newProject = Project({
            rifa: newRifa,
            name: name,
            symbol: symbol,
            mintedTokens: numTokens,
            currentTokenId: 0
        });
        projects.push(newProject);
        return newProject;
    }

    function getProjects() public view returns (Project[] memory) {
        return projects;
    }

    function transferToken(uint256 projectId, address to, uint256 tokenId) public onlyOwner {
        Project storage project = projects[projectId];
        require(tokenId < project.mintedTokens, "Invalid tokenId");

        project.rifa.approveTo(address(this), tokenId);
        project.rifa.safeTransferFrom(address(project.rifa), to, tokenId);

        project.currentTokenId++;
    }

    function ownerOfToken(uint256 projectId, uint256 tokenId) public view returns (address) {
        Project storage project = projects[projectId];
        return project.rifa.ownerOf(tokenId);
    }

     function approveUSDT(uint256 projectId, uint256 amount) public onlyOwner {
        Project storage project = projects[projectId];
        project.rifa.approveUSDT(amount);
    }

    function transferUSDT(uint256 projectId, address to, uint256 amount) public onlyOwner {
        Project storage project = projects[projectId];
        approveUSDT(projectId,amount);
        project.rifa.transferUSDT(to, amount);
    }

    function getBalanceOfUSDT(uint256 projectId) public view returns (uint256) {
        Project storage project = projects[projectId];
        return usdtToken.balanceOf(address(project.rifa));
    }


function buy(uint256 amount) public {
    // Asegúrate de que el remitente ha aprobado al menos 'amount' USDT para ser transferidos por este contrato
    require(usdtToken.allowance(msg.sender, address(this)) >= amount, "Insufficient allowance");

    // Retira 'amount' USDT del remitente y envíalos a este contrato
    require(usdtToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");
}

}
