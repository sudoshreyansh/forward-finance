export default function NumberInput({
  input,
  setInput,
  right
}: {
  input: number,
  setInput: (input: number) => void,
  right?: boolean
}) {
  return (
    <>
      <input
        type="number"
        value={input}
        className={`w-full border border-solid border-border bg-background2 text-sm py-1 px-3 ${right ? 'text-right' : ''}`}
        onChange={e => setInput(parseInt(e.target.value))}
        />
    </>
  )
}