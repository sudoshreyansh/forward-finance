import type { ITrade } from ".";

export default function Trade({ trade }: { trade: ITrade }) {
  const isTradeProfitable = (trade.profit && trade.profit > 0);
  const isTradeOpen = (trade.price !== undefined ? (trade.expiry > 0) : false);

  return (
    <div key={trade.id} className={`pl-8 px-4 py-3 text-sm border-b border-solid border-border ${isTradeOpen ? '' : 'opacity-50'}`}>
      <div className="flex justify-between items-center">
        <div className="grow basis-0">
          <div className={`inline-block text-xs px-1.5 py-0.5 border border-solid border-border ${trade.position === 0 ? 'bg-customGreen' : 'bg-customRed'}`}>
            { trade.position === 0 ? "LONG" : "SHORT" }
          </div>
        </div>
        <div className="grow basis-0 text-center">
          { trade.collateral }
        </div>
        <div className="grow basis-0 text-center">
          { trade.price ? trade.price : "" }
        </div>
        <div className={`grow basis-0 text-center ${isTradeProfitable ? 'text-customGreen' : 'text-customRed'}`}>
          {
            trade.profit ?
            ( isTradeProfitable ? `+${trade.profit}` : `${trade.profit}` ) :
            ""
          }
        </div>
        <div className="grow basis-0 text-right">
          {
            trade.expiry < 1 ? 
              "Expired" :
              (trade.expiry === 1 ? "Today" : `${trade.expiry} days`)
          }
        </div>
      </div>
    </div>
  )
}