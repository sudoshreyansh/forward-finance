import Trade from "./trade";

export type ITrade = {
  id: number;
  position: number;
  curve: number;
  price?: number;
  profit?: number;
  collateral: number;
  expiry: number;
}

export default function OpenTrades({ trades }: {
  trades: ITrade[]
}) {

  return (
    <div className="">
      {
        trades.length === 0 ?
        <div className="pl-8 p-4 text-sm">There are no open trades</div> :
        trades.map(trade => (
          <Trade trade={trade} />
        ))
      }
    </div>
  )
}