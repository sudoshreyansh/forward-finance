"use client";

import { useAccount, useNetwork } from "wagmi";
import Margin from "../margin";
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useEffect, useState } from "react";

export default function Header() {
  const { open } = useWeb3Modal();
  const [showConnectButton, setShowConnectButton] = useState<boolean>(true);
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();

  useEffect(() => {
    setShowConnectButton(!isConnected);
  }, [isConnected]);


  return (
    <Margin>
      <header className="flex justify-between py-2">
        <div className="font-semibold">
          forward
        </div>
        {
          showConnectButton || !address ?
          <div className="px-3 py-1.5 font-semibold bg-primary text-sm rounded cursor-pointer" onClick={() => open()}>
            Connect Wallet
          </div> :
          <div className="flex items-center gap-4">
            <div className="text-sm py-1 px-2">
              { chain?.name }
            </div>
            <div className="text-sm">
              { address.slice(0, 4) }...{ address.slice(address.length - 6) }
            </div>
            <div className="rounded-full bg-primary w-6 h-6">
            </div>
          </div>
        }
      </header>
    </Margin>
  )
}