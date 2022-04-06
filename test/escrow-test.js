const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Escrow", function () {
  it("Should return the status - AWAITING PAYMENT once deployed", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const Escrow = await ethers.getContractFactory("Escrow");
    const escrow = await Escrow.deploy(owner.address, addr1.address, ethers.utils.parseEther('0.5'), 200);
    await escrow.deployed();

    expect(await escrow.curStatus()).to.equal(0);   
  });

  it("Should deposit escrow fund and return the status - AWAITING_DELIVERY after deposit", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const Escrow = await ethers.getContractFactory("Escrow");
    const escrow = await Escrow.deploy(owner.address, addr1.address, ethers.utils.parseEther('0.5'), 200);
    await escrow.deployed();
    const depositEscrowFund = await escrow.deposit({
      value: ethers.utils.parseEther('0.5')
    });
    // // wait until the transaction is mined
    await depositEscrowFund.wait();

    expect(await escrow.amount()).to.equal(ethers.utils.parseEther('0.5'));
    expect(await escrow.curStatus()).to.equal(1);
  });

  it("Should deliver project by freelancer and return the status - DELIVERED after delivery", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const Escrow = await ethers.getContractFactory("Escrow");
    const escrow = await Escrow.deploy(owner.address, addr1.address, ethers.utils.parseEther('0.5'), 1);
    await escrow.deployed();

    const depositEscrowFund = await escrow.deposit({
      value: ethers.utils.parseEther('0.5')
    });

    // // wait until the transaction is mined
    await depositEscrowFund.wait();


    const deliverEscowProject = await escrow.connect(addr1).deliverProject("https://google.com");

    await deliverEscowProject.wait();

    expect(await escrow.output()).to.equal("https://google.com");
    expect(await escrow.curStatus()).to.equal(2);
  });

  it("Should accept project by recruiter and return the status - ACCEPTED ", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const Escrow = await ethers.getContractFactory("Escrow");
    const escrow = await Escrow.deploy(owner.address, addr1.address, ethers.utils.parseEther('0.5'), 1);
    await escrow.deployed();

    const depositEscrowFund = await escrow.deposit({
      value: ethers.utils.parseEther('0.5')
    });

    // // wait until the transaction is mined
    await depositEscrowFund.wait();


    const deliverEscowProject = await escrow.connect(addr1).deliverProject("https://google.com");

    await deliverEscowProject.wait();

    const acceptEscowProject = await escrow.connect(owner).acceptProject();

    await acceptEscowProject.wait();

    expect(await escrow.curStatus()).to.equal(3);

  });
  it("Should withdraw escrow fund to freelancer and return the status - COMPLETED ", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const Escrow = await ethers.getContractFactory("Escrow");
    const escrow = await Escrow.deploy(owner.address, addr1.address, ethers.utils.parseEther('0.5'), 1);
    await escrow.deployed();

    const depositEscrowFund = await escrow.deposit({
      value: ethers.utils.parseEther('0.5')
    });

    // // wait until the transaction is mined
    await depositEscrowFund.wait();


    const deliverEscowProject = await escrow.connect(addr1).deliverProject("https://google.com");

    await deliverEscowProject.wait();

    const acceptEscowProject = await escrow.connect(owner).acceptProject();

    await acceptEscowProject.wait();

    const withdrawEscrowFund = await escrow.connect(addr1).withdrawEscrowFund();

    await withdrawEscrowFund.wait();

    expect(await escrow.curStatus()).to.equal(4);
  });
});
