import { type Dispatch, Fragment, type SetStateAction } from "react"
import { MenuCategoryComponent } from "./MenuCategory/MenuCategoryComponent"
import { CategoryDivider, MenuContainer } from "./OrderingMenu.styles"
import { api } from "../../utils/api"
import type { MenuItem } from "../../types/MenuItem"

interface MenuProps {
  setSelectedItem: Dispatch<SetStateAction<MenuItem | undefined>>
}

export function OrderingMenu({ setSelectedItem }: MenuProps) {
  const { data: menu } = api.menu.get.useQuery({ id: 1 })
  return menu ? (
    <MenuContainer>
      {menu.categories!.map((category, i) => (
        <Fragment key={`menu-category-${category.name}`}>
          <MenuCategoryComponent
            items={category.items}
            name={category.name}
            setSelectedItem={setSelectedItem}
          />
          {i !== menu.categories!.length - 1 && <CategoryDivider />}
        </Fragment>
      ))}
      <div style={{ minHeight: "100px" }} />
    </MenuContainer>
  ) : null
}
