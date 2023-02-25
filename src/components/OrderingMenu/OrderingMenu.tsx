import { type Dispatch, Fragment, type SetStateAction, useContext } from "react"
import { MenuCategoryComponent } from "./MenuCategory/MenuCategoryComponent"
import { CategoryDivider, MenuContainer } from "./OrderingMenu.styles"
import { api } from "../../utils/api"
import type { MenuItem } from "../../types/MenuItem"
import type { CartItem } from "../../types/Cart"
import { storeContext } from "../../contexts/storeContext"

interface MenuProps {
  setSelectedItem: Dispatch<SetStateAction<MenuItem | CartItem | undefined>>
}

export function OrderingMenu({ setSelectedItem }: MenuProps) {
  const store = useContext(storeContext)
  const { data: menu } = api.menu.getByStoreId.useQuery({ id: store.id })

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
