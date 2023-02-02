import type { ReactComponents } from "../../types/React"

export function Dimmer({
  children,
  isItemSelected,
}: ReactComponents & { isItemSelected: boolean }) {
  return (
    <div
      className={`bg-sl absolute z-10 h-screen animate-fadein-fast ${
        !isItemSelected ? "hidden" : ""
      }`}
      style={{ background: "rgba(30,41,59,0.5)", width: "150vw" }}
    >
      {children}
    </div>
  )
}
