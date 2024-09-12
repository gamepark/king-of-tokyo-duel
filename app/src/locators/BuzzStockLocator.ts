import { FlexLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

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
  lineGap = { y: 4}
}

export const buzzStockLocator = new BuzzStockLocator()