import { useState } from "react";
import Modal from ".";
import TextInput from "../trade/new-trade/Text";

export type PairConfig = {
  symbol: string;
  oracle: string;
}

export default function PairChangeModal({
  toggleModal,
  setPairConfig,
  pairConfig
}: {
  toggleModal: () => void,
  setPairConfig: (v: PairConfig) => void,
  pairConfig?: PairConfig
}) {
  const [symbol, setSymbol] = useState<string>(pairConfig?.symbol ?? '');
  const [oracle, setOracle] = useState<string>(pairConfig?.oracle ?? '');

  return (
    <Modal toggleModal={toggleModal}>
      <div className="w-[35vw] p-4">
        <div className="text-lg font-medium pb-4">
          Set Trading Pair
        </div>
        <div className="">
          <div className="flex justify-between py-2">
            <div className="text-sm">
              Symbol:
            </div>
            <div className="w-[60%]">
              <TextInput
                input={symbol}
                setInput={setSymbol}
                placeholder=""
                />
            </div>
          </div>
          <div className="flex justify-between py-2">
            <div className="text-sm">
              Oracle:
            </div>
            <div className="w-[60%]">
              <TextInput
                input={oracle}
                setInput={setOracle}
                placeholder=""
                />
            </div>
          </div>
          <div className="flex justify-between py-2">
            <div className="text-sm">
              Network:
            </div>
            <div className="w-[60%]">
              <TextInput
                input="Polygon Mumbai"
                setInput={(v) => {}}
                placeholder=""
                />
            </div>
          </div>
          <div className="bg-primary px-4 py-1 text-sm inline-block rounded mt-4 cursor-pointer" onClick={() => { setPairConfig({ symbol, oracle }), toggleModal() }}>
            Set Pair
          </div>
        </div>
      </div>
    </Modal>
  )
}