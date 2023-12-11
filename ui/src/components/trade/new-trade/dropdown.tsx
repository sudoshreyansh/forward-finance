import { useState } from "react";
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import TextInput from "./Text";

export type DropdownOptions = {
  title: string;
  value: any;
}

export default function Dropdown({
  options,
  selected,
  setSelected,
  other
}: {
  options: DropdownOptions[],
  selected: any,
  setSelected: (option: any) => void,
  other?: boolean;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [customCurve, setCustomCurve] = useState<string>('');

  return (
    <div className="relative">
      <div className="flex justify-between border border-solid border-border px-2 py-1 text-sm bg-background2" onClick={() => setIsDropdownOpen(v => !v)}>
        <div>
          { options[options.findIndex(el => el.value === selected)]?.title ?? selected }
        </div>
        <ChevronDownIcon className="h-5 w-5" />
      </div>

      {
        isDropdownOpen ?
        <div className="absolute top-full left-0 right-0 border border-solid border-border z-10 flex flex-col">
          <div className="max-h-30 overflow-y-scroll" onClick={() => setIsDropdownOpen(v => !v)}>
            {
              options.map((option, i) => (
                <div
                  key={i}
                  className="px-2 py-1 text-sm bg-background2 hover:bg-secondary cursor-pointer"
                  onClick={() => setSelected(option.value)}>
                  { option.title }
                </div>
              ))
            }
          </div>
          {
            other ?
            <div className="flex gap-2 p-2 bg-background2 items-stretch">
              <div className="grow">
                <TextInput
                  input={customCurve}
                  setInput={setCustomCurve}
                  placeholder="Add a custom curve address"
                />
              </div>
              <div>
                <div className="w-20 bg-secondary flex items-center justify-center h-full cursor-pointer" onClick={() => { setSelected(customCurve); setIsDropdownOpen(false) }}>
                  + Add
                </div>
              </div>
            </div> :
            <></>
          }
        </div> :
        <></>
      }
    </div>
  )
}