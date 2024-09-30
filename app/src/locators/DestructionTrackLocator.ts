import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { HexagonalGridCoordinatesSystem, HexagonalGridLocator, ItemContext } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'

export class DestructionTrackLocator extends HexagonalGridLocator {
  parentItemType = MaterialType.MainBoard
  positionOnParent = {x: 50, y: 66}
  coordinatesSystem = HexagonalGridCoordinatesSystem.OddQ
  size = { x: 1.27, y: 1.8 }

  getItemCoordinates(item: MaterialItem<number, number>, context: ItemContext<number, number, number>): Partial<Coordinates> {
    if (context.type === MaterialType.Pawn) {
      const { x = 0, y = 0 } = super.getItemCoordinates(item, context)
      return { x: x + 0.3, y: y - 0.8 }
    }
    return super.getItemCoordinates(item, context)
  }
}

export const destructionTrackLocator = new DestructionTrackLocator()