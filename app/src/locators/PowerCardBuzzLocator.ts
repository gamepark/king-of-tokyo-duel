import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { LocationDescription, Locator } from '@gamepark/react-game'

export class PowerCardBuzzLocator extends Locator {
  parentItemType = MaterialType.PowerCard
  positionOnParent = { x: 16, y: 23 }
  locationDescription = new LocationDescription({ width: 1.5, height: 1.5, borderRadius: 1 })
}

export const powerCardBuzzLocator = new PowerCardBuzzLocator()