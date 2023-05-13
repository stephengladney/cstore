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
    <div className="sticky top-0 z-50 mt-4 mb-4 block bg-white px-4 pt-2 md:mt-10 md:px-0">
      <div className="border-gr flex w-full max-w-[500px] items-center rounded-lg border-[1px] border-solid border-gray-300 bg-white py-2 px-4">
        <input
          className="grow border-0 font-poppins focus:outline-none"
          onChange={handleChange}
          placeholder="Search..."
          value={inputValue}
        />
        <MdClose
          size={20}
          fill="#A1A1AA"
          className="cursor-pointer"
          onClick={handleClear}
        />
      </div>
    </div>
  )
}
