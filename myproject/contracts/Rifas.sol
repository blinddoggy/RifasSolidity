// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Rifas is ERC721, Ownable {
    uint256 public currentTokenId = 0;
    
    IERC20 public usdtToken;
    uint256 public nftPrice; // price for each NFT

    constructor(string memory name, string memory symbol, IERC20 _usdtToken, uint256 _nftPrice) ERC721(name, symbol) {
        usdtToken = _usdtToken;
        nftPrice = _nftPrice;
    }
    
    function mint(address to, uint256 numTokens) public  {
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


    //Agregar precio de NFT, Agregar el precio del premio,symbol price premio,agregar fecha de juego,TotalSupply d NFTs q quedan en el contrato
   struct Project {
        Rifas rifa;
        string name;
        string symbol;
        uint256 mintedTokens;
        uint256 currentTokenId;
    }

    Project[] public projects;

    //agregar
    function createProject(string memory name, string memory symbol, uint256 numTokens) public onlyOwner returns (Project memory) {
        Rifas newRifa = new Rifas(name, symbol, usdtToken , 2);
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

    // Añade esta función en tu contrato de ProjectRifasFactory

    function buyAndMint(uint256 projectId, uint256 numTokens) external  {
        // Calcula el costo total en USDT para acuñar numTokens NFTs
        uint256 totalCost = numTokens * nftPrice;
        
        // Asegúrate de que el remitente ha aprobado al menos totalCost USDT para ser transferidos por este contrato
        require(usdtToken.allowance(msg.sender, address(this)) >= totalCost, "Insufficient allowance");

        // Retira totalCost USDT del remitente y envíalos al contrato "Rifa" del proyecto
        require(usdtToken.transferFrom(msg.sender, address(projects[projectId].rifa), totalCost), "Transfer failed");
        
        // Mint numTokens NFTs para el remitente
        for(uint256 i = 0; i < numTokens; i++) {
            projects[projectId].rifa.mint(msg.sender, 1);
        }
    }



function winner(uint256 projectId, uint256 tokenId, address otherAddress, uint256 percentage) public onlyOwner {
    require(percentage <= 100, "Percentage cannot be greater than 100");
    
    Project storage project = projects[projectId];
    // Asegúrate de que el tokenId es válido
    require(tokenId < project.mintedTokens, "Invalid tokenId");

    // Determina el propietario del tokenId
    address tokenOwner = project.rifa.ownerOf(tokenId);
    
    // Calcula el balance del contrato Rifa
    uint256 contractBalance = usdtToken.balanceOf(address(project.rifa));
    
    // Asegúrate de que el contrato Rifa tiene suficientes fondos
    require(contractBalance > 0, "Insufficient contract balance");

    // Calcula el porcentaje del balance para la otra dirección
    uint256 otherAmount = contractBalance * percentage / 100;
    uint256 ownerAmount = contractBalance - otherAmount;

    // Aprueba la transferencia para la otra dirección
    project.rifa.approveUSDT(otherAmount);
    // Transfiere los fondos del contrato Rifa a la otra dirección
    project.rifa.transferUSDT(otherAddress, otherAmount);

    // Aprueba la transferencia para el propietario del tokenId
    project.rifa.approveUSDT(ownerAmount);
    // Transfiere los fondos del contrato Rifa al propietario del tokenId
    project.rifa.transferUSDT(tokenOwner, ownerAmount);
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




    
}
