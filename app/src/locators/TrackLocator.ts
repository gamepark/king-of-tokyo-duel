import { Buzz, buzzDescriptions } from '@gamepark/king-of-tokyo-duel/material/Buzz'
import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { Pawn } from '@gamepark/king-of-tokyo-duel/material/Pawn'
import { HexagonalGridLocator, ItemContext } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'

export abstract class TrackLocator extends HexagonalGridLocator {
  parentItemType = MaterialType.MainBoard
  size = { x: 1.27, y: 1.8 }
  boundaries = { xMin: -7, xMax: 7 }

  getItemCoordinates(item: MaterialItem, context: ItemContext): Partial<Coordinates> {
    const { x = 0, y = 0 } = super.getItemCoordinates(item, context)
    if (context.type === MaterialType.Pawn) {
      if (item.id === Pawn.Fame) {
        return { x: x - 0.1, y: y - 0.8 }
      } else {
        return { x: x + 0.3, y: y - 0.8 }
      }
    }
    return { x, y }
  }

  placeItem(item: MaterialItem<number, number>, context: ItemContext<number, number, number>): string[] {
    const transform = super.placeItem(item, context)
    if (context.type === MaterialType.Buzz) {
      const description = buzzDescriptions[item.id as Buzz]
      if (description.effects.length === 2 && !description.changeTrack) {
        transform.push('translateY(-0.15em)')
      } else if (description.effects.length === 1) {
        transform.push('translateY(-0.35em)')
      }
    }
    return transform
  }

  getItemRotateZ(item: MaterialItem, context: ItemContext) {
    const rotateZ = super.getItemRotateZ(item, context)
    if (buzzDescriptions[item.id as Buzz].effects.length === 2) {
      return item.location.rotation % 3 === 0 ? rotateZ + 40 : rotateZ + 20
    }
    return rotateZ
  }
}
