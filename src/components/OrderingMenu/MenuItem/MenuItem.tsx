import type { Dispatch, SetStateAction } from "react"
import type { Item } from "../../../types/Item"
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
} from "./MenuItem.styles"

interface MenuItemProps {
  item: Item
  openModal: () => void
  setSelectedItem: Dispatch<SetStateAction<Item | undefined>>
}

export function MenuItem({ item, openModal, setSelectedItem }: MenuItemProps) {
  const selectItem = () => {
    setSelectedItem(item)
    openModal()
  }

  return (
    <MenuItemContainer
      isDisabled={!item.isAvailable}
      onClick={() => {
        if (item.isAvailable) selectItem()
      }}
    >
      <MenuItemPrimaryContainer>
        <MenuItemPhoto src={item.imageUrl} />
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
