import Modal from "@/components/modal"
import Dropdown from "./dropdown"
import { CurveTypes } from "."
import { useState } from "react"
import Image from "next/image"

export const CurveTypesHelp = {
  "0x123": {
    description: "This is a normal traditional futures curve.",
    leverage: "20x",
    priceExposure: "1.00x",
    graph: "/Traditional.svg"
  },
  "0x234": {
    description: "This curve denotes a linear mapping between the original and transformed prices. The ratio between the two prices is 0.3 and can be used to reduce the leverage and increase price discovery for an asset.",
    leverage: "20x",
    priceExposure: "3.34x",
    graph: "/Under-Leveraged.svg"
  },
  "0x345": {
    description: "This curve is meant for taking calculated risks in high volatility curves. The initial is the traditional curve which after hitting the 30% mark starts with the under-leverage curve.",
    leverage: "20x",
    priceExposure: "2.64x",
    graph: "/High Volatility.svg"
  },
  "0x456": {
    description: "The PnL curve is equivalent to the Uniswap Impermanent Loss curve. Can be used to efficiently hedge against it.",
    leverage: "20x",
    priceExposure: "NA",
    graph: "/Uniswap IL.svg"
  }
}

export default function CurveHelpModal({
  toggleModal
}: {
  toggleModal: () => void
}) {
  const [curve, setCurve] = useState<string>(CurveTypes[0].value);

  return (
    <Modal toggleModal={toggleModal}>
      <div className="flex gap-16 p-6 w-[60vw]">
        <div className="relative w-1/2 pt-[50%] shrink-0">
          <Image
            src={CurveTypesHelp[curve as keyof typeof CurveTypesHelp].graph}
            alt="Picture of the author"
            sizes="500px"
            fill
            style={{
              objectFit: 'contain',
            }}
          />
        </div>
        <div className="">
          <Dropdown
            options={CurveTypes}
            selected={curve}
            setSelected={setCurve}
            />
          <div className="pt-4">
            { CurveTypesHelp[curve as keyof typeof CurveTypesHelp].description }
          </div>
          <div className="pt-4">
            <span className="font-medium">Leverage:</span> {CurveTypesHelp[curve as keyof typeof CurveTypesHelp].leverage} <br />
            <span className="font-medium">Price Exposure:</span> {CurveTypesHelp[curve as keyof typeof CurveTypesHelp].priceExposure} <br />
          </div>
        </div>
      </div>
    </Modal>
  )
}