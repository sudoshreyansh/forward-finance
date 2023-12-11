export default function Modal({
  children,
  toggleModal
}: {
  children: React.ReactNode,
  toggleModal: () => void
}) {
  return (
    <div className="fixed left-0 top-0 w-screen h-screen">
      <div className="absolute inset-0 bg-[black] opacity-40" onClick={() => toggleModal()}></div>
      <div className={`absolute bg-background2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded`}>
        { children }
      </div>
    </div>
  )
}