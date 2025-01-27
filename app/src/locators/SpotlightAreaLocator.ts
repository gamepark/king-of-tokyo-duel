import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { LocationDescription, Locator } from '@gamepark/react-game'

export class SpotlightAreaLocator extends Locator {
  parentItemType = MaterialType.MainBoard
  positionOnParent = { x: 25, y: 51.8 }
  locationDescription = new LocationDescription({ width: 5.5, height: 15 })
}

export const spotlightAreaLocator = new SpotlightAreaLocator()