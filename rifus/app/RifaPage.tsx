// RifaPage.js
import React from "react";
import Link from "next/link";
import * as methods from "../utils/methods";

const RifaPage = () => {
  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="max-w-lg p-8 bg-gradient-to-br from-red-600 via-red-500 to-red-400 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Rifa de la Fortuna</h1>
        <p className="text-lg mb-6">
          ¡Participa en nuestra rifa y gana increíbles premios!
        </p>
        <div className="flex justify-center">
          <Link href="/comprar-rifa">
            <button className="bg-red-700 hover:bg-red-600 px-6 py-3 rounded-lg font-bold text-white">
              Comprar Rifa
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RifaPage;
