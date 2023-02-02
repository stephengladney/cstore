import { type SetStateAction, useState } from "react"
import {
  CategoryContainer,
  CategoryHeader,
  CategoryName,
  ItemsContainer,
} from "./MenuCategoryComponent.styles"
import { MenuItemComponent } from "../MenuItem/MenuItemComponent"
import type { MenuItem } from "../../../types/MenuItem"

interface CategoryProps {
  items: MenuItem[]
  name: string
  setSelectedItem: React.Dispatch<SetStateAction<MenuItem | undefined>>
}

export function MenuCategoryComponent({
  items,
  name,
  setSelectedItem,
}: CategoryProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  return (
    <CategoryContainer>
      <CategoryHeader onClick={() => setIsExpanded(!isExpanded)}>
        <CategoryName>{name}</CategoryName>
      </CategoryHeader>
      {isExpanded && (
        <ItemsContainer>
          {items.map((item, i) => (
            <MenuItemComponent
              item={item}
              key={`item-${i}`}
              setSelectedItem={setSelectedItem}
            />
          ))}
        </ItemsContainer>
      )}
    </CategoryContainer>
  )
}
