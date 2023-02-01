import type { ReactComponents } from "../../types/React"

export function HeaderContainer({ children }: ReactComponents) {
  return (
    <div className="flex w-full flex-row justify-center bg-valero py-3.5 px-4 shadow-md lg:px-6">
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
    <div className="flex flex-row items-center justify-start text-zinc-50">
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
    <div className="flex flex-row items-center justify-end text-zinc-50 lg:hidden">
      {children}
    </div>
  )
}

export function HeaderTitle({ children }: ReactComponents) {
  return (
    <div className="font-poppins text-2xl font-bold text-zinc-100">
      {children}
    </div>
  )
}

export function HeaderSubTitle({ children }: ReactComponents) {
  return (
    <div className="hidden pt-0.5 font-poppins text-base text-zinc-200 md:block">
      {children}
    </div>
  )
}

export function CartBadge({ itemCount }: { itemCount: number }) {
  return (
    <div className="z-20 -ml-1 -mt-4 rounded-3xl bg-red-600 font-poppins text-xs font-bold text-zinc-50">
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
