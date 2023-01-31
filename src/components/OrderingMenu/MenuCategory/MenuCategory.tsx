import { type SetStateAction, useState } from "react"
import {
  CategoryContainer,
  CategoryHeader,
  CategoryName,
  ItemsContainer,
} from "./MenuCategory.styles"
import { MenuItem } from "../MenuItem/MenuItem"
import type { Item } from "../../../types/Item"

interface CategoryProps {
  items: Item[]
  name: string
  openModal: () => void
  setSelectedItem: React.Dispatch<SetStateAction<Item | undefined>>
}

export function MenuCategory({
  items,
  name,
  openModal,
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
            <MenuItem
              item={item}
              key={`item-${i}`}
              openModal={openModal}
              setSelectedItem={setSelectedItem}
            />
          ))}
        </ItemsContainer>
      )}
    </CategoryContainer>
  )
}
