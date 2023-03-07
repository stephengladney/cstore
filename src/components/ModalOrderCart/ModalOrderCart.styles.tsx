import type { ReactComponents } from "../../types/React"

export function ModalWrapper({ children }: ReactComponents) {
  return (
    <div className="flex h-screen w-screen flex-col justify-center overflow-y-scroll border border-solid border-gray-200 bg-white px-8 pb-8 shadow-sm md:rounded-xl lg:flex lg:h-[600px] lg:w-[600px] lg:flex-col lg:items-center">
      {children}
    </div>
  )
}

export function ModalContent({ children }: ReactComponents) {
  return <div className="w-full animate-fadein-1s lg:max-w-md">{children}</div>
}

export function CloseButton({ closeModal }: { closeModal: () => void }) {
  return (
    <button
      className="absolute top-4 right-4 rounded-full bg-slate-700 px-2 text-lg text-white outline-none hover:bg-slate-800"
      onClick={closeModal}
    >
      <div className="-mt-[2px]">&times;</div>
    </button>
  )
}
