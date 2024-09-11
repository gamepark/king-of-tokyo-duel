import { PileLocator } from "@gamepark/react-game";

export class EnergyStockLocator extends PileLocator {
  coordinates = { x: 17, y: -14, z: 0.05 }
  radius = 2.5
}

export const energyStockLocator = new EnergyStockLocator()