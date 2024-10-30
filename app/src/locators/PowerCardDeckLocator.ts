import { DeckLocator } from '@gamepark/react-game'

export class PowerCardDeckLocator extends DeckLocator {
  coordinates = { x: -17, y: -15 }
  gap = { x: -0.03, y: -0.03 }
  limit = 400

}

export const powerCardDeckLocator = new PowerCardDeckLocator()