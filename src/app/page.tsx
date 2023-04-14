"use client";

import {
  useAccount,
} from "wagmi";
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function Home() {
  const { address, isConnected } = useAccount();

  return (
    <div className="flex items-center justify-center h-screen flex-col gap-4">
      <ConnectButton />
      {isConnected && (
        <>
          <div className="text-2xl">{address}</div>
        </>
      )}
    </div>
  );
}