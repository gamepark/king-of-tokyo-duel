import { TokenDescription } from '@gamepark/react-game'
import DiceToken from '../images/tokens/DiceToken.jpg'

export class DiceTokenDescription extends TokenDescription {
  height = 1.7
  width = 1.7
  borderRadius = 0.1
  image = DiceToken
}

export const diceTokenDescription = new DiceTokenDescription()