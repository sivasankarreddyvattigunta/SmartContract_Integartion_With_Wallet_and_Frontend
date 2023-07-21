const hre = require("hardhat");

async function main() {
  // Fetch and display the network name
  const networkName = await hre.network.name;
  console.log(`Network Name: ${networkName}`);

  // Fetch and display the number of accounts connected
  const accounts = await hre.ethers.provider.listAccounts();
  console.log(`Number of Accounts Connected: ${accounts.length}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
