import type { ReactComponents } from "../../types/React"

export function Body({ children }: ReactComponents) {
  return (
    <div className="flex grow animate-fadein flex-row overflow-hidden">
      {children}
    </div>
  )
}
