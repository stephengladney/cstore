import { type Dispatch, Fragment, type SetStateAction } from "react"
import { MenuCategory } from "./MenuCategory/MenuCategory"
import { CategoryDivider, MenuContainer } from "./OrderingMenu.styles"
import type { Category, Item } from "../../types/Item"
import { dummyItems, getMenu } from "../../lib/menu"

interface MenuProps {
  openModal: () => void
  setSelectedItem: Dispatch<SetStateAction<Item | undefined>>
}

const menu: Category[] = getMenu(dummyItems)

export function OrderingMenu({ openModal, setSelectedItem }: MenuProps) {
  return (
    <MenuContainer>
      {menu.map((category, i) => (
        <Fragment key={`menu-category-${category.name}`}>
          <MenuCategory
            items={category.items}
            name={category.name}
            openModal={openModal}
            setSelectedItem={setSelectedItem}
          />
          {i !== menu.length - 1 && <CategoryDivider />}
        </Fragment>
      ))}
      <div style={{ minHeight: "100px" }} />
    </MenuContainer>
  )
}
