import { useState } from 'react'
import NewTrade from './new-trade';
import OpenTrades, { ITrade } from './open-trades';
import { useContractRead, useContractWrite } from 'wagmi';

const items = [
  {
    name: "Your Trades",
  },
  {
    name: "New Trade",
  }
]

export default function TradeWindow() {
  const [selectedItem, setSelectedItem] = useState<number>(0);
  const [trades, setTrades] = useState<ITrade[]>([]);
  const { write } = useContractWrite({
    address: '0x3283b3Ed6Ad7E26acf57ab15C3e740281B78D612',
    abi: [{
			"inputs": [],
			"name": "submitTrade",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		}],
    functionName: 'submitTrade'
  });
  const { data } = useContractRead({
    address: '0x502931dEC7CED2BD4843255902D06e7Ca4FEbE8B',
    abi: [{
			"inputs": [],
			"name": "getChainlinkDataFeedLatestAnswer",
			"outputs": [
				{
					"internalType": "int256",
					"name": "",
					"type": "int256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}],
    functionName: 'getChainlinkDataFeedLatestAnswer',
    watch: true
  });
  console.log(Number(data) / 1e8, typeof data)

  return (
    <div className="flex flex-col h-full">
      <div className="pl-4 flex h-[40px] bg-[#131722] border border-l-0 border-solid border-[#363a45] w-full text-sm">
        {
          items.map((item, i) => (
            <div
              key={i}
              className={`px-4 py-2 cursor-pointer font-medium ${i === selectedItem ? "text-primary" : ""}`}
              onClick={() => setSelectedItem(i)}
              >
              {item.name}
            </div>
          ))
        }
      </div>
      <div className="grow bg-[#131722] h-[calc(100% - 40px)] border border-t-0 border-l-0 border-solid border-[#363a45] w-full">
        {
          selectedItem === 0 ?
          <OpenTrades trades={trades} /> :
          <NewTrade submitTrade={(trade: ITrade) => {
            trades.push({
              ...trade,
              price: (Number(data) as number)  / 1e8,
              profit: 0.01,
              expiry: 1
            });
            write();
          }} />
        }
      </div>
    </div>
  )  
}