import TradingViewWidget from "@/components/trading-view"
import Margin from "@/components/margin"
import TradeWindow from "@/components/trade"
import { useState } from "react"
import type { PairConfig } from "@/components/modal/pair-change"
import PairChangeModal from "@/components/modal/pair-change"

export default function Home() {
  const [pairConfig, setPairConfig] = useState<PairConfig>({
    symbol: 'LINK',
    oracle: '0x1C2252aeeD50e0c9B64bDfF2735Ee3C932F5C408'
  });
  const [showPairChangeModal, setShowPairChangeModal] = useState<boolean>(true);

  return (
    <div>
      <Margin>
        <div className="text-primary text-sm mb-2 cursor-pointer" onClick={() => setShowPairChangeModal(true)}>
          Change Pair
        </div>
        <div className="text-4xl font-bold mb-4">
          { pairConfig?.symbol } / USDC
        </div>
        <div className="flex gap-x-10 flex-wrap mb-8">
          <div className="flex gap-x-4">
            <div className="font-semibold">Network</div>
            <div>Polygon Mumbai</div>
          </div>
          <div className="flex gap-x-4">
            <div className="font-semibold">Oracle</div>
            <div className="underline">{ pairConfig?.oracle?.slice(0, 4) }...{ pairConfig?.oracle?.slice(pairConfig?.oracle?.length - 6) }</div>
          </div>
        </div>
      </Margin>
      <Margin>
        <div className="flex items-stretch">
          <div className="w-4/6 pt-[45%] relative shrink-0">
            <div className="absolute inset-0">
              <TradingViewWidget />
            </div>
          </div>
          
          <div className="grow">
            <TradeWindow />
          </div>
        </div>
      </Margin>

      {
        showPairChangeModal ?
        <PairChangeModal
          toggleModal={() => { setShowPairChangeModal(false) }}
          pairConfig={pairConfig}
          setPairConfig={setPairConfig}
        /> : 
        <></>
      }
    </div>
  )
}
