import { type Dispatch, type SetStateAction, useContext } from "react"
import { storeContext } from "../../contexts/storeContext"
import { RxHamburgerMenu } from "react-icons/rx"
import { NavLink, NavLinkContainer } from "./NavMenu.styles"

export function NavMenu({
  isNavMenuOpen,
  setIsNavMenuOpen,
}: {
  isNavMenuOpen: boolean
  setIsNavMenuOpen: Dispatch<SetStateAction<boolean>>
}) {
  const store = useContext(storeContext)
  const handleDrawerClick = () => {
    setIsNavMenuOpen((isNavMenuOpen) => !isNavMenuOpen)
  }

  const navLinks = [
    { title: "Store", url: `/${store.slug}` },
    { title: "About", url: "/" },
    { title: "Support", url: "/support" },
  ]

  return (
    <div
      className={`${
        !isNavMenuOpen ? "ml-[-30rem]" : ""
      } absolute z-10 h-full w-full py-3.5 px-4 text-white lg:w-80 lg:py-2.5 lg:px-6`}
      style={{
        backgroundColor: store.color,
        transition: "margin-left ease-out 0.25s",
      }}
    >
      <RxHamburgerMenu
        size="1.5em"
        onClick={handleDrawerClick}
        className={`${
          !isNavMenuOpen ? "opacity-0" : "opacity-1"
        } mt-1 cursor-pointer lg:mt-4`}
        style={{ transition: "opacity ease-out 0.1s" }}
      />
      <NavLinkContainer>
        {navLinks.map((link, i) => (
          <NavLink title={link.title} url={link.url} key={i} />
        ))}
      </NavLinkContainer>
    </div>
  )
}
