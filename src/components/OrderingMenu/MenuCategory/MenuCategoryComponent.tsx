import { type SetStateAction, useState } from "react"
import {
  CategoryContainer,
  CategoryHeader,
  CategoryName,
  ItemsContainer,
} from "./MenuCategoryComponent.styles"
import { MenuItemComponent } from "../MenuItem/MenuItemComponent"
import type { MenuItemType } from "../../../types/MenuItemType"
import type { CartItem } from "../../../types/Cart"

interface CategoryProps {
  items: MenuItemType[]
  name: string
  setSelectedItem: React.Dispatch<
    SetStateAction<MenuItemType | CartItem | undefined>
  >
}

export function MenuCategoryComponent({
  items,
  name,
  setSelectedItem,
}: CategoryProps) {
  return (
    <CategoryContainer>
      <CategoryHeader>
        <CategoryName>{name}</CategoryName>
      </CategoryHeader>
      <ItemsContainer>
        {items.map((item, i) => (
          <MenuItemComponent
            item={item}
            key={`item-${i}`}
            setSelectedItem={setSelectedItem}
          />
        ))}
      </ItemsContainer>
    </CategoryContainer>
  )
}
