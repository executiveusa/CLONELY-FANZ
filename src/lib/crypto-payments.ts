import { ethers } from "ethers";

export const PAYMENT_ADDRESSES = {
  ETH: "0x...", // Your ETH address
  BNB: "0x...", // Your BNB address
  USDT: "0x...", // Your USDT address
};

export async function connectWallet() {
  if (!window.ethereum) {
    throw new Error("Please install MetaMask to make crypto payments");
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return provider.getSigner();
}

export async function makePayment(
  amount: number,
  currency: keyof typeof PAYMENT_ADDRESSES,
) {
  const signer = await connectWallet();

  const tx = await signer.sendTransaction({
    to: PAYMENT_ADDRESSES[currency],
    value: ethers.utils.parseEther(amount.toString()),
  });

  return tx.hash;
}
