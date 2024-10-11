import { Buzz, buzzDescriptions } from '@gamepark/king-of-tokyo-duel/material/Buzz'
import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { FlexLocator, ItemContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'

export class BuzzStockLocator extends FlexLocator {
  coordinates = { x: -12.5, y: 13 }
  lineSize = 6

  getCoordinates(location: Location) {
    if (location.x! < 4) return { x: -13.8, y: 12 }
    if (location.x! < 6) return { x: -17.5, y: 12 }
    if (location.x! < 9) return { x: -12, y: 12 }
    return { x: -9.5, y: 12 }
  }

  getGap(location: Location) {
    if (location.x! < 4) return { x: 5 }
    if (location.x! < 6) return { x: 6 }
    if (location.x! < 9) return { x: 6.5 }
    return { x: 5.5 }
  }

  lineGap = { y: 4 }

  getRotateZ(location: Location) {
    return typeof location.rotation === 'number' ? location.rotation * 60 : 0
  }

  getItemRotateZ(item: MaterialItem, context: ItemContext) {
    const rotateZ = super.getItemRotateZ(item, context)
    if (context.type === MaterialType.Buzz && buzzDescriptions[item.id as Buzz].effects.length === 2) {
      return item.location.rotation % 3 === 0 ? rotateZ + 40 : rotateZ + 20
    }
    return rotateZ
  }
}

export const buzzStockLocator = new BuzzStockLocator()