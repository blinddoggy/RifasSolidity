"use client"

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../utils/Rifas.json";

//conectar metamask
const getEthereumObject = () => window.ethereum;



/*
 * This function returns the first linked account found.
 * If there is no account linked, it will return null.
 */
export const findMetaMaskAccount = async () => {
  try {
    const ethereum = getEthereumObject();

    /*
     * First make sure we have access to the Ethereum object.
     */
    if (!ethereum) {
      console.error("Make sure you have Metamask!");
      return null;
    }

    console.log("We have the Ethereum object", ethereum);
    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      return account;
    } else {
      console.error("No authorized account found");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};


//AQUI VAN LAS FUNCIONES
  //const [currentAccount, setCurrentAccount] = useState("");
//contract address wave
//const contractAddress = "0x582fe3dEFDCb59F797fcE5ed0839E211D6c02f8b";
const contractAddress = "0xD125d8e666E0208F2DD209028Fc27abF572D94de"
  
//variable for ABI wave
export  const contractABI = abi.abi;
      
//connect wallet function
export  const connectWallet = async () => {
    try {
      const ethereum = getEthereumObject();
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      //setCurrentAccount(accounts[0]);
      buyAndMint();
    } catch (error) {
      console.error(error);
    }
  };


  //funciones property token
  //get image uri nft
  //balance token(erc20) contrato
  //name

  export const buyAndMint = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        //linking contract
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);


        /*
        * Execute the actual wave from your smart contract
        */
        const count = await wavePortalContract.buyAndMint(0,2);
        //dando wave
        console.log("Mining...", count.hash);

        //obteniendo wave
        await count.wait();
        console.log("Mined -- ", count.hash);
        console.log("Retrieved total wave count...",count);

        
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  
  //calling method usdtToken
   export const usdtToken = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        //linking contract
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let nombre = await wavePortalContract.nftPrice();
        console.log("Retrieved nombre...", nombre);

        /*
        * Execute the actual wave from your smart contract
        */

            } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }
  
   //calling method name
   export const nameProject = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        //linking contract
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let nombre = await wavePortalContract.nombresiio();
        console.log("Retrieved nombre...", nombre);

        /*
        * Execute the actual wave from your smart contract
        */

            } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  //symbol

  //calling methods symbol
   const symbolProject = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        //linking contract
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let nombre = await wavePortalContract.symbol();
        console.log("Retrieved symbol...", nombre);

        /*
        * Execute the actual wave from your smart contract
        */

            } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }


  //calling methods get balance NFT(erc721)
   const getBalanaceNfts = async () => {
    try {
      const { ethereum } = window;
      const address = '0x0eE3DDA02D614468D6bF0cB17480C974F93b1EA6'
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        //linking contract
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let nombre = await wavePortalContract.balanceOf(address);
        console.log("Retrieved balance of NFTs...", nombre);

        /*
        * Execute the actual wave from your smart contract
        */

            } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  //calling methods get balance NFT(erc721)
   const getUri = async () => {
    try {
      const { ethereum } = window;
      const address = '0x0eE3DDA02D614468D6bF0cB17480C974F93b1EA6'
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        //linking contract
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
        //getting the URI of NFT with id = 0 (first NFT created)
        let nombre = await wavePortalContract.tokenURI(0);
        console.log("Retrieved Url image...", nombre);

        /*
        * Execute the actual wave from your smart contract
        */

            } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  
  //calling methods mint an NFT
   const mint = async () => {
    try {
      const { ethereum } = window;
      //test img uri
      const uri = 'https://i.pinimg.com/550x/63/0d/ac/630dac7828755c90ec651d252f69ba67.jpg'
      //test address
      const address = '0x0eE3DDA02D614468D6bF0cB17480C974F93b1EA6'
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        //linking contract
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        //mint a NFT to the address owner
        let minted = await wavePortalContract.safeMint(address,uri);
        console.log("Minted NFT to...", minted);
        console.log("Mining...", minted.hash);

        //obteniendo mint
        await minted.wait();
        console.log("Mined -- ", minted.hash);

        /*
        * Execute the actual wave from your smart contract
        */

            } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  
  //calling methods from contract
   const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        //linking contract
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());

        /*
        * Execute the actual wave from your smart contract
        */

        //dando wave
        const waveTxn = await wavePortalContract.wave();
        console.log("Mining...", waveTxn.hash);

        //obteniendo wave
        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

        count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }


  /*
   * This runs our function when the page loads.
   * More technically, when the App component "mounts".
   */
//   useEffect(async () => {
//     const account = await findMetaMaskAccount();
//     if (account !== null) {
//       setCurrentAccount(account);
//     }
//   }, []);


//   //UI
//   return (
//     <div className="mainContainer">
//       <div className="dataContainer">
//         <div className="header">
//           👋 Hey there!
//         </div>

//         <div className="bio">
//           I am Marioli..
//           Connect your Ethereum wallet and wave at me!
//         </div>

//         <button className="waveButton" onClick={usdtToken}>
//           Symbol
//         </button>

//         <button className="waveButton" onClick={getBalanaceNfts}>
//           Balance
//         </button>

//          <button className="waveButton" onClick={buyAndMint}>
//           Mint
//         </button>

//          <button className="waveButton" onClick={getUri}>
//           URI
//         </button>

//         {/*
//          * If there is no currentAccount render this button
//          */}
//         {!currentAccount && (
//           <button className="waveButton" onClick={connectWallet}>
//             Connect Wallet
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

//export default App;