import type { ReactComponents } from "../../types/React"

export function ModalWrapper({ children }: ReactComponents) {
  return (
    <div className="flex h-screen w-screen flex-col justify-center border border-solid border-gray-200 bg-white shadow-sm md:rounded-xl lg:flex lg:h-auto lg:max-h-screen lg:w-[600px] lg:flex-col lg:items-center lg:pb-4 lg:pt-10">
      {children}
    </div>
  )
}

export function ModalContent({ children }: ReactComponents) {
  return (
    <div className="no-scrollbar w-full animate-fadein-1s overflow-x-hidden overflow-y-scroll px-8 pb-8 lg:max-w-lg">
      {children}
    </div>
  )
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
