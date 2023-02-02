import { type Dispatch, Fragment, type SetStateAction, useEffect } from "react"
import { MenuCategory } from "./MenuCategory/MenuCategory"
import { CategoryDivider, MenuContainer } from "./OrderingMenu.styles"
import { api } from "../../utils/api"
import type { MenuItem } from "../../types/MenuItem"

interface MenuProps {
  openModal: () => void
  setSelectedItem: Dispatch<SetStateAction<MenuItem | undefined>>
}

export function OrderingMenu({ openModal, setSelectedItem }: MenuProps) {
  const { data: menu } = api.menu.get.useQuery({ id: 1 })
  return (
    <MenuContainer>
      {menu?.categories.map((category, i) => (
        <Fragment key={`menu-category-${category.name}`}>
          <MenuCategory
            items={category.items}
            name={category.name}
            openModal={openModal}
            setSelectedItem={setSelectedItem}
          />
          {i !== menu.categories.length - 1 && <CategoryDivider />}
        </Fragment>
      ))}
      <div style={{ minHeight: "100px" }} />
    </MenuContainer>
  )
}
