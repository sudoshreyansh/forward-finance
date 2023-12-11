import { formatEther, parseEther } from "viem";
import hre from "hardhat";

async function main() {
  const [wallet] = await hre.viem.getWalletClients();
  const publicClient = await hre.viem.getPublicClient();

  const contract = await hre.viem.deployContract("MatchMaker", [wallet.account.address]);

  const data = await publicClient.readContract({
    address: contract.address,
    abi: contract.abi,
    functionName: 'testFunction'
  })

  console.log(data);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
