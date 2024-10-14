import { PileLocator } from "@gamepark/react-game";

export class WhiteTokenStockLocator extends PileLocator {
  coordinates = { x: -23, y: -15.5, z: 0.05 }
  radius = 0.8
}

export const whiteTokenStockLocator = new WhiteTokenStockLocator()