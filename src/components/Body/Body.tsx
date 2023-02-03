import { useState } from "react"
import type { ReactComponents } from "../../types/React"
import { Dimmer } from "../OrderingContainer/Dimmer"
import { DimmerProvider } from "../../contexts/dimmerContext"

export function Body({ children }: ReactComponents) {
  const [isDimmed, setIsDimmed] = useState(false)
  return (
    <>
      <Dimmer isDimmed={isDimmed} />
      <DimmerProvider value={{ isDimmed, setIsDimmed }}>
        <div className="flex grow flex-row overflow-y-hidden">{children}</div>
      </DimmerProvider>
    </>
  )
}
