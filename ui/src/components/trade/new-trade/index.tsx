import Dropdown from "./dropdown";
import Radio from "./radio";
import { useState } from 'react';
import NumberInput from "./number";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import CurveHelpModal, { CurveTypesHelp } from "./curvehelp";
import { ITrade } from "../open-trades";

const Positions = ['Long', 'Short'];

export const CurveTypes = [{
  title: 'Traditional',
  value: '0x123'
}, {
  title: 'Under-Leveraged',
  value: '0x234'
}, {
  title: 'High Volatility',
  value: '0x345'
}, {
  title: 'Uniswap IL',
  value: '0x456'
}];

const OrderTypes = [{
  title: 'Open Limit',
  value: '0'
}];

const ExpiryDates = Array(7).fill(undefined).map((_, i) => {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + i);
  date.setUTCHours(0);
  date.setUTCMinutes(0);
  date.setUTCSeconds(0);
  date.setUTCMilliseconds(0);

  return {
    title: date.toDateString(),
    value: date.valueOf()
  }
});


export default function NewTrade({
  submitTrade
}: {
  submitTrade: (v: ITrade) => void
}) {
  const [position, setPosition] = useState<number>(0);
  const [curve, setCurve] = useState<string>('0x123');
  const [minCollateral, setMinCollateral] = useState<number>(0);
  const [maxCollateral, setMaxCollateral] = useState<number>(1000);
  const [expiry, setExpiry] = useState<number>(ExpiryDates[0].value);
  const [showCurveHelp, setShowCurveHelp] = useState<boolean>(false);

  return (
    <>
      <div className="pl-8 py-3 px-4">
        <div className="font-semibold text-md mb-4">
          Create New Position 
        </div>
        <Radio 
          options={Positions}
          selected={position}
          setSelected={setPosition} />

        <div className="mt-4 mb-2 text-sm font-medium flex items-start gap-2">
          <div>Curve Type</div>
          <div onClick={() => setShowCurveHelp(true)}>
            <QuestionMarkCircleIcon className="h-4 w-4 cursor-pointer" />
          </div>
        </div>
        <Dropdown
          options={CurveTypes}
          selected={curve}
          setSelected={setCurve}
          other={true} />
        <div className="pt-2 px-2 text-xs opacity-50 flex justify-between">
          <div>
            Leverage: { CurveTypesHelp[curve as keyof typeof CurveTypesHelp].leverage }
          </div>
          <div>
            Price Exposure: { CurveTypesHelp[curve as keyof typeof CurveTypesHelp].priceExposure }
          </div>
        </div>

        <div className="mt-4 mb-2 text-sm font-medium">
          Type
        </div>
        <Dropdown
          options={OrderTypes}
          selected={'0'}
          setSelected={(v) => {}} />

        <div className="mt-4 mb-2 text-sm font-medium">
          Collateral
        </div>
        <div className="flex items-stretch gap-x-4">
          <div className="basis-0 grow">
            <div className="text-xs pb-1">
              Min
            </div>
            <NumberInput input={minCollateral} setInput={setMinCollateral} />
          </div>
          <div className="basis-0 grow">
            <div className="text-xs pb-1 text-right">
              Max
            </div>
            <NumberInput input={maxCollateral} setInput={setMaxCollateral} right={true} />
          </div>
        </div>

        <div className="mt-4 mb-2 text-sm font-medium">
          Expiry <span className="italic font-normal text-xs">12:00 AM UTC</span>
        </div>
        <Dropdown
          options={ExpiryDates}
          selected={expiry}
          setSelected={setExpiry} />

        <div className="cursor-pointer bg-primary text-sm text-center rounded py-2 mt-6" onClick={() => submitTrade({
          id: Date.now(),
          curve: 0,
          position,
          collateral: maxCollateral,
          expiry
        })}>
          Place Order
        </div>
      </div>

      {
        showCurveHelp ? 
        <CurveHelpModal toggleModal={() => { setShowCurveHelp(false) }} /> :
        <></>
      }
    </>
  );
}