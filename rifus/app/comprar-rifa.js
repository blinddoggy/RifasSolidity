// comprar-rifa.js
import React from "react";
import * as methods from "../utils/methods";

const ComprarRifa = () => {
  const handleCompraRifa = async () => {
    try {
      console.log("Comprando rifa y minteando NFT...");
      console.log(await methods.connectWallet());
      console.log("USDT Token..");
      console.log(await methods.usdtToken());
      console.log("Comprando rifa..");
      console.log(await methods.buyAndMint());
    } catch (error) {
      console.error("Error al comprar y mintear la rifa:", error);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="max-w-lg p-8 bg-gradient-to-br from-red-600 via-red-500 to-red-400 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Rifa de la Fortuna</h1>
        <p className="text-lg mb-6">¡Comprando Rifa!...</p>
        <div className="flex justify-center">
          <button
            className="bg-red-700 hover:bg-red-600 px-6 py-3 rounded-lg font-bold text-white"
            onClick={handleCompraRifa}
          >
            Comprando...
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComprarRifa;
