
import { PileLocator } from "@gamepark/react-game";

export class DiscardLocator extends PileLocator {
  coordinates = { x: 17, y: -15, z: 0.05 }
  gap = { x: -0.03, y: -0.03 }
  maxAngle = 5
}

export const discardLocator = new DiscardLocator()