const hre = require("hardhat");

async function main() {
  console.log("\n🔍 Verifying Contracts on Etherscan");
  console.log("===================================");

  const fs = require("fs");
  let deploymentInfo;
  try {
    deploymentInfo = JSON.parse(fs.readFileSync("deployment.json"));
  } catch (error) {
    console.error("❌ deployment.json not found. Run deploy first.");
    process.exit(1);
  }

  const contracts = deploymentInfo.contracts;

  console.log("\nVerifying OPMToken...");
  try {
    await hre.run("verify:verify", {
      address: contracts.OPMToken,
      constructorArguments: [deploymentInfo.deployer],
    });
    console.log("✅ OPMToken verified");
  } catch (error) {
    console.log("⚠️ OPMToken verification failed:", error.message);
  }

  console.log("\nVerifying Treasury...");
  try {
    await hre.run("verify:verify", {
      address: contracts.Treasury,
      constructorArguments: [],
    });
    console.log("✅ Treasury verified");
  } catch (error) {
    console.log("⚠️ Treasury verification failed:", error.message);
  }

  console.log("\nVerifying PaymentProcessor...");
  try {
    await hre.run("verify:verify", {
      address: contracts.PaymentProcessor,
      constructorArguments: [contracts.OPMToken, contracts.Treasury],
    });
    console.log("✅ PaymentProcessor verified");
  } catch (error) {
    console.log("⚠️ PaymentProcessor verification failed:", error.message);
  }

  console.log("\n✅ Verification process complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
