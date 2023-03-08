const { wait } = require("@testing-library/user-event/dist/utils");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("stakeFIL contract", function () {
  let stakeFIL;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    const StakeFIL = await ethers.getContractFactory("stakeFIL");
    [owner, addr1, addr2] = await ethers.getSigners();
    stakeFIL = await StakeFIL.connect(owner).deploy();
  });

  it("should set the duration", async function () {
    await stakeFIL.setDuration(60 * 60 * 24 * 30); // 30 days in seconds
    expect(await stakeFIL.getDuration()).to.equal(60 * 60 * 24 * 30);
  });

  it("should stake FIL", async function () {
    const amount = ethers.utils.parseEther("1");
    const duration = 60 * 60 * 24 * 30; // 30 days in seconds
    await stakeFIL.stake(addr1.address, duration, { value: amount });
    expect(await stakeFIL.readUserStake(addr1.address)).to.equal(amount);
  });
});
