import { TokenDescription } from '@gamepark/react-game'
import DiceToken from '../images/tokens/DiceToken.jpg'
import { DiceTokenHelp } from './help/DiceTokenHelp'

export class DiceTokenDescription extends TokenDescription {
  height = 1.7
  width = 1.7
  borderRadius = 0.2
  image = DiceToken
  help = DiceTokenHelp
}

export const diceTokenDescription = new DiceTokenDescription()