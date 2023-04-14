"use client";

import {
  useAccount,
  useContractRead,
} from "wagmi";
import { ConnectButton } from '@rainbow-me/rainbowkit'

const contractAbi = [
  'function mint(address _to) public',
  'function balanceOf(address owner) external view returns (uint256 balance)'
]

export default function Home() {
  const { address, isConnected } = useAccount();

  const { data: balance = 0 } = useContractRead({
    address,
    abi: contractAbi,
    functionName: "balanceOf",
    args: [address],
  });

  return (
    <div className="flex items-center justify-center h-screen flex-col gap-4">
      <ConnectButton />
      {isConnected && (
        <>
          <strong className="text-2xl">NFT Count</strong>
          <div className="text-2xl">{`${balance ?? 0}`}</div>
          <div className="text-2xl">{address}</div>
        </>
      )}
    </div>
  );
}