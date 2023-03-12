import { type Dispatch, type SetStateAction } from "react"
import type { MenuItemType } from "../../../types/MenuItemType"
import type { CartItem } from "../../../types/Cart"
import {
  MenuItemContainer,
  MenuItemDescription,
  MenuItemHeader,
  MenuItemPrimaryContainer,
  MenuItemSecondaryContainer,
  MenuItemName,
  MenuItemNameContainer,
  MenuItemPhoto,
  MenuItemPrice,
  MenuItemPriceContainer,
  UnavailablePill,
} from "./MenuItemComponent.styles"

interface MenuItemProps {
  item: MenuItemType
  setSelectedItem: Dispatch<SetStateAction<MenuItemType | CartItem | undefined>>
}

export function MenuItemComponent({ item, setSelectedItem }: MenuItemProps) {
  return (
    <MenuItemContainer
      isDisabled={!item.isAvailable}
      onClick={() => {
        if (item.isAvailable) {
          setSelectedItem(item)
          // dispatch({ type: "ADD_ITEM", payload: { ...item, quantity: 1 } })
        }
      }}
    >
      <MenuItemPrimaryContainer>
        <MenuItemPhoto src={item.imageUrl ?? ""} />
      </MenuItemPrimaryContainer>
      <MenuItemSecondaryContainer>
        <MenuItemHeader>
          <MenuItemNameContainer>
            <MenuItemName isDisabled={!item.isAvailable}>
              {item.name}
            </MenuItemName>
            {!item.isAvailable && <UnavailablePill />}
          </MenuItemNameContainer>
          <MenuItemPriceContainer>
            <MenuItemPrice>${Number(item.price).toFixed(2)}</MenuItemPrice>
          </MenuItemPriceContainer>
        </MenuItemHeader>
        <MenuItemDescription isDisabled={!item.isAvailable}>
          {item.description}
        </MenuItemDescription>
      </MenuItemSecondaryContainer>
    </MenuItemContainer>
  )
}
