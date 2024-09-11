import { FlexLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export class BuzzStockLocator extends FlexLocator {
  coordinates = { x: -12.5, y: 13 }
  lineSize = 7

  getCoordinates(location: Location) {
    if (location.x! < 5) return { x: -14, y: 12 }
    if (location.x! < 7) return { x: -20.5, y: 12 }
    if (location.x! < 10) return { x: -12, y: 12 }
    return { x: -9.5, y: 12 }
  }

  getGap(location: Location) {
    if (location.x! < 5) return { x: 4 }
    if (location.x! < 7) return { x: 5.5 }
    if (location.x! < 10) return { x: 6.5 }
    return { x: 5.5 }
  }
  lineGap = { y: 4}
}

export const buzzStockLocator = new BuzzStockLocator()