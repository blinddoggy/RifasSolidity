import { ethers, waffle } from "hardhat";
import { Contract, Signer } from "ethers";
import { expect } from "chai";

describe("ProjectRifasFactory", function () {
    let accounts: Signer[];
    let ProjectRifasFactory: Contract;
    let owner: Signer;
    let addr1: Signer;
    let addr2: Signer;
  
    beforeEach(async function () {
        accounts = await ethers.getSigners();
        owner = accounts[0];
        addr1 = accounts[1];
        addr2 = accounts[2];
    
        const ProjectRifasFactoryFactory = await ethers.getContractFactory("ProjectRifasFactory");
        ProjectRifasFactory = await ProjectRifasFactoryFactory.deploy('0x68F4bfc14A87357D4ff686872a4b3cbA125C4008',2);
        await ProjectRifasFactory.deployed();
    });

    describe("createProject", function () {
        it("Should create a new project", async function () {
            await expect(ProjectRifasFactory.connect(owner).createProject("Test Project", "TP", 100))
            .to.emit(ProjectRifasFactory, "ProjectCreated")
            .withArgs(0, "Test Project", "TP", 100, 0);
        });

        it("Should fail if not called by the owner", async function () {
            await expect(ProjectRifasFactory.connect(addr1).createProject("Test Project", "TP", 100)).to.be.revertedWith("Ownable: caller is not the owner");
        });
    });

    describe("getProjects", function () {
        it("Should return all the projects", async function () {
            await ProjectRifasFactory.connect(owner).createProject("Test Project 1", "TP1", 100);
            await ProjectRifasFactory.connect(owner).createProject("Test Project 2", "TP2", 200);

            const projects = await ProjectRifasFactory.getProjects();

            expect(projects[0]).to.include({name: "Test Project 1", symbol: "TP1", mintedTokens: 100, currentTokenId: 0});
            expect(projects[1]).to.include({name: "Test Project 2", symbol: "TP2", mintedTokens: 200, currentTokenId: 0});
        });
    });

    // Tests for other functions ...
});
