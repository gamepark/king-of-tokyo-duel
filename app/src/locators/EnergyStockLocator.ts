import { PileLocator } from "@gamepark/react-game";

export class EnergyStockLocator extends PileLocator {
  coordinates = { x: 22.5, y: -15.5, z: 0.05 }
  radius = 2
}

export const energyStockLocator = new EnergyStockLocator()