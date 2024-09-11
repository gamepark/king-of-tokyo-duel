import { DeckLocator } from '@gamepark/react-game'

export class EnergyCardDeckLocator extends DeckLocator {
  coordinates = { x: -17, y: -15 }
  gap = { x: 0.03, y: -0.03 }

}

export const energyCardDeckLocator = new EnergyCardDeckLocator()