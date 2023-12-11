export default function TextInput({
  input,
  setInput,
  placeholder
}: {
  input: string,
  setInput: (input: string) => void,
  placeholder: string
}) {
  return (
    <>
      <input
        value={input}
        className={`w-full border border-solid border-border bg-background2 text-sm py-1 px-3`}
        onChange={e => setInput(e.target.value)}
        placeholder={placeholder}
        />
    </>
  )
}