import { PileLocator } from '@gamepark/react-game'

export class WhiteTokenStockLocator extends PileLocator {
  coordinates = { x: -22.5, y: -14.3 }
  radius = 1
}

export const whiteTokenStockLocator = new WhiteTokenStockLocator()