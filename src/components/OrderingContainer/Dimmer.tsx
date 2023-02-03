import type { ReactComponents } from "../../types/React"

export function Dimmer({
  children,
  isDimmed,
}: ReactComponents & { isDimmed: boolean }) {
  return (
    <div
      className={`bg-sl absolute z-10 h-screen animate-fadein ${
        !isDimmed ? "hidden" : ""
      }`}
      style={{
        background: "rgba(30,41,59,0.5)",
        width: "100vw",
      }}
    >
      {children}
    </div>
  )
}
