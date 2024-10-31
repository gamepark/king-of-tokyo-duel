import { ListLocator } from '@gamepark/react-game'
import { diceDescription } from '../material/DiceDescription'

export class WhiteDiceStockLocator extends ListLocator {
  coordinates = { x: -23.5, y: -17.5 }
  gap = { x: diceDescription.width + 0.5 }
}

export const whiteDiceStockLocator = new WhiteDiceStockLocator()