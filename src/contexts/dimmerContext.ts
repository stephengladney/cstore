import { createContext, useState } from "react"

const useDimmer = () => {
  const [isDimmed, setIsDimmed] = useState<boolean>(false)
  return { isDimmed, setIsDimmed }
}
export const dimmerContext = createContext({} as ReturnType<typeof useDimmer>)
export const DimmerProvider = dimmerContext.Provider
