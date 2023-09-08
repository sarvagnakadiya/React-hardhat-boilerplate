const fs = require("fs");
const hre = require("hardhat");

async function main() {
  const network = hre.network.name;
  const timestamp = new Date().toISOString();

  // contract name here
  const contractName = "stakeFIL";
  const stakeFactory = await hre.ethers.getContractFactory(contractName);
  const stake = await stakeFactory.deploy();

  const contractAddress = stake.address;

  const contractInfo = { contractName, network, timestamp, contractAddress };

  // Load existing JSON data or initialize an empty array
  let contractData = [];
  try {
    const existingData = fs.readFileSync("contracts.json", "utf8");
    contractData = JSON.parse(existingData);
  } catch (error) {
    // File doesn't exist or is empty, initialize with an empty array
    contractData = [];
  }

  contractData.push(contractInfo);

  // Write the updated array back to the JSON file
  fs.writeFileSync("contracts.json", JSON.stringify(contractData, null, 2));

  console.log(`Contract "${contractName}" deployed to:`, contractAddress);
  console.log("Network:", network);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
