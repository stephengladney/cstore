import type { ReactComponents } from "../../types/React"

export function Body({ children }: ReactComponents) {
  return <div className="flex grow flex-row overflow-y-hidden">{children}</div>
}
