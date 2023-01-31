import type { ReactComponents } from "../../types/React"

export function HeaderContainer({ children }: ReactComponents) {
  return (
    <div className="flex w-full flex-row justify-center bg-[#2a6f8a] py-3.5 px-4 shadow-md lg:px-6">
      {children}
    </div>
  )
}

export function MaxWidthContainer({ children }: ReactComponents) {
  return (
    <div className="grid grow" style={{ gridTemplateColumns: "1fr 6fr 1fr" }}>
      {children}
    </div>
  )
}

export function HeaderLeftCell({ children }: ReactComponents) {
  return (
    <div className="text-zinc-50 flex flex-row items-center justify-start">
      {children}
    </div>
  )
}

export function HeaderCenterCell({ children }: ReactComponents) {
  return (
    <div className="flex flex-col items-center justify-center">{children}</div>
  )
}

export function HeaderRightCell({ children }: ReactComponents) {
  return (
    <div className="text-zinc-50 flex flex-row items-center justify-end lg:hidden">
      {children}
    </div>
  )
}

export function HeaderTitle({ children }: ReactComponents) {
  return (
    <div className="text-white font-poppins text-lg font-bold">{children}</div>
  )
}

export function HeaderSubTitle({ children }: ReactComponents) {
  return (
    <div className="text-zinc-50 hidden pt-0.5 font-poppins text-base md:block">
      {children}
    </div>
  )
}

export function CartBadge({ itemCount }: { itemCount: number }) {
  return (
    <div className="bg-red-600 text-zinc-50 z-20 -ml-1 -mt-4 rounded-3xl font-poppins text-xs font-bold">
      {itemCount}
    </div>
  )
}
// export const CartBadge = styled.div`

//   line-height: 8px;
//   margin-left: -5px;
//   margin-top: -15px;
//   padding: ${(p: { itemCount: number }) =>
//     `6px ${p.itemCount > 1 ? "7px" : "8px"}`};
//   z-index: 2;
// `
