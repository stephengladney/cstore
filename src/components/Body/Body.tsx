import type { ReactComponents } from "../../types/React"

export function Body({ children }: ReactComponents) {
  return <div className="flex grow flex-row">{children}</div>
}
