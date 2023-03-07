import { useState } from "react"
import type { ReactComponents } from "../../types/React"
import { Dimmer } from "../Dimmer"
import { DimmerProvider } from "../../contexts/dimmerContext"

export function Body({ children }: ReactComponents) {
  return (
    <>
      <div className="flex grow flex-row overflow-y-hidden">{children}</div>
    </>
  )
}
