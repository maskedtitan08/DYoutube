const hre = require("hardhat");

async function main() {
  
  const dyoutube = await hre.ethers.deployContract("DYouTube");
  await dyoutube.waitForDeployment();

  console.log("Contract deployed to :" ,dyoutube.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
