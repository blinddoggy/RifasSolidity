import { ethers } from "hardhat";
import { expect } from "chai";
import { Contract } from "@ethersproject/contracts";
import { Signer } from "@ethersproject/abstract-signer";

describe("Rifas", function () {
  let rifas: Contract;
  let signers: Signer[];

  beforeEach(async function () {
    // Obtiene los signers de la red local Hardhat
    signers = await ethers.getSigners();

    // Despliega tu contrato
    const RifasFactory = await ethers.getContractFactory("Rifas");
    rifas = await RifasFactory.deploy('bol1','bl1','0x68F4bfc14A87357D4ff686872a4b3cbA125C4008',2/* Tus argumentos del constructor van aquí */);

    // Agrega cualquier configuración inicial aquí
  });

  it("should mint correctly", async function () {
    // Llama a la función mint y verifica que el balance aumentó
    await rifas.connect(signers[0]).mint(signers[0].getAddress(), 1);
    expect(await rifas.balanceOf(signers[0].getAddress())).to.equal(1);
  });

  // Escribe más tests aquí
});
