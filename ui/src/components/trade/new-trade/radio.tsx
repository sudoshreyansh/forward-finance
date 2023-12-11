export default function Radio({
  options,
  selected,
  setSelected
}: {
  options: string[],
  selected: number,
  setSelected: (option: number) => void
}) {
  return (
    <div className="flex text-sm">
      {
        options.map((option, i) => (
          <div
            key={i}
            className={`py-1 px-3 cursor-pointer ${ i === selected ? 'bg-background2 border border-solid border-border' : '' }`}
            onClick={() => setSelected(i)}
            >
            { option }
          </div>
        ))
      }
    </div>
  )
}