import { DeckLocator } from '@gamepark/react-game'

export class DiscardLocator extends DeckLocator {
  coordinates = { x: 16, y: -15, z: 0.05 }
  gap = { x: -0.03, y: -0.03 }
}

export const discardLocator = new DiscardLocator()