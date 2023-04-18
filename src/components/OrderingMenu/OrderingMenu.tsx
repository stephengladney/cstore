import {
  type Dispatch,
  Fragment,
  type SetStateAction,
  useContext,
  useState,
  useEffect,
} from "react"
import { MenuCategoryComponent } from "./MenuCategory/MenuCategoryComponent"
import { CategoryDivider, MenuContainer } from "./OrderingMenu.styles"
import { api } from "../../utils/api"
import type { MenuItemType } from "../../types/MenuItemType"
import type { CartItem } from "../../types/Cart"
import { storeContext } from "../../contexts/storeContext"
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner"
import { MenuSearch } from "./MenuSearch/MenuSearch"
import type { MenuType } from "../../types/MenuType"
import type { MenuCategoryType } from "../../types/MenuCategoryType"
import { RequestItem } from "./MenuSearch/RequestItem"

function searchMenu(menu: MenuType, string: string) {
  const results = { categories: [] as MenuCategoryType[] }
  menu.categories?.forEach((category) => {
    const categoryMatchesQuery = String(category.name)
      .toLowerCase()
      .includes(String(string).toLowerCase())
    if (categoryMatchesQuery) {
      results.categories.push({
        name: category.name,
        items: category.items,
      })
    } else {
      const matches = category.items.filter((item) =>
        String(item.name).toLowerCase().includes(String(string).toLowerCase())
      )
      if (matches.length > 0) {
        results.categories.push({ name: category.name, items: matches })
      }
    }
  })
  return results
}

interface MenuProps {
  setSelectedItem: Dispatch<SetStateAction<MenuItemType | CartItem | undefined>>
}

export function OrderingMenu({ setSelectedItem }: MenuProps) {
  const store = useContext(storeContext)
  const { data: menu, isLoading } = api.menu.getByStoreId.useQuery({
    id: store.id,
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [menuToRender, setMenuToRender] = useState<MenuType | null | undefined>(
    menu
  )

  const getMenuToRender = () => {
    if (menu) {
      if (searchQuery) {
        const searchedMenu = searchMenu(menu, searchQuery)
        if (searchedMenu.categories.length > 0) return searchedMenu
        else return null
      } else return menu
    } else return null
  }

  useEffect(() => {
    setMenuToRender({
      id: menu?.id ?? 0,
      name: menu?.name as string,
      ...(getMenuToRender() ?? { categories: [] }),
    })
  }, [searchQuery])

  if (isLoading)
    return (
      <div className="mt-[200px]">
        <LoadingSpinner />
      </div>
    )
  else if (menuToRender?.categories)
    return (
      <div className="flex w-full flex-col">
        <MenuSearch setSearchQuery={setSearchQuery} />
        <MenuContainer>
          {menuToRender.categories.map((category: MenuCategoryType, i) => (
            <Fragment key={`menu-category-${category.name}`}>
              <MenuCategoryComponent
                items={category.items}
                name={category.name}
                setSelectedItem={setSelectedItem}
              />
              {i !== menuToRender.categories!.length - 1 && <CategoryDivider />}
            </Fragment>
          ))}
        </MenuContainer>
        <RequestItem />
        <div style={{ minHeight: "100px" }} />
      </div>
    )
  else return <div>Error</div>
}
