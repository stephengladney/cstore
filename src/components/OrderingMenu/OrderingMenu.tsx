import { type Dispatch, Fragment, type SetStateAction, useContext } from "react"
import { MenuCategoryComponent } from "./MenuCategory/MenuCategoryComponent"
import { CategoryDivider, MenuContainer } from "./OrderingMenu.styles"
import { api } from "../../utils/api"
import type { MenuItemType } from "../../types/MenuItemType"
import type { CartItem } from "../../types/Cart"
import { storeContext } from "../../contexts/storeContext"
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner"

interface MenuProps {
  setSelectedItem: Dispatch<SetStateAction<MenuItemType | CartItem | undefined>>
}

export function OrderingMenu({ setSelectedItem }: MenuProps) {
  const store = useContext(storeContext)
  const { data: menu, isLoading } = api.menu.getByStoreId.useQuery({
    id: store.id,
  })

  if (isLoading)
    return (
      <div className="mt-[200px]">
        <LoadingSpinner />
      </div>
    )
  else if (menu)
    return (
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
    )
  else return <div>Error</div>
}
