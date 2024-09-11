import { ListLocator } from '@gamepark/react-game'
import { diceDescription } from '../material/DiceDescription'

export class DiceStockLocator extends ListLocator {

  gap = { x: diceDescription.width + 0.7 }
  coordinates = { x: -20, y: -10 }
}

export const diceStockLocator = new DiceStockLocator()