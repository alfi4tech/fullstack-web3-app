import fs from "fs";
import { ethers } from "hardhat";

async function main() {
  const Blog = await ethers.getContractFactory("Blog");
  const blog = await Blog.deploy("My WEB3 Blog");

  await blog.deployed();

  console.log("Blog deployed to:", blog.address);

  fs.writeFileSync(
    "./config.ts",
    `
  export const contractAddress = "${blog.address}"
  export const ownerAddress = "${await blog.signer.getAddress()}"
  `
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
