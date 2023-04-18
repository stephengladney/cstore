import {
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  useTransition,
  useState,
} from "react"
import { MdClose } from "react-icons/md"

export function MenuSearch({
  setSearchQuery,
}: {
  setSearchQuery: Dispatch<SetStateAction<string>>
}) {
  const [inputValue, setInputValue] = useState("")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    startTransition(() => {
      setSearchQuery(e.target.value)
    })
  }

  const handleClear = () => {
    setInputValue("")
    startTransition(() => {
      setSearchQuery("")
    })
  }
  return (
    <div className="mt-6 mb-4 flex  items-center  px-4 md:mt-10 md:px-0">
      <input
        className="border-gr w-full max-w-[500px] rounded-lg border-[1px] border-solid border-gray-300 py-2 px-4 font-poppins"
        onChange={handleChange}
        placeholder="Search..."
        value={inputValue}
      />
      <MdClose
        size={20}
        fill="#A1A1AA"
        className="z-10 ml-[-35px] cursor-pointer"
        onClick={handleClear}
      />
    </div>
  )
}