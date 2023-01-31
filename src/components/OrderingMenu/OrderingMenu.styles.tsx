import type { ReactComponents } from "../../types/React"

export function CategoryDivider() {
  return <hr className="my-10 hidden border-slate-400 lg:block" />
}

export function MenuContainer({ children }: ReactComponents) {
  return <div className="my-4 md:my-10">{children}</div>
}
