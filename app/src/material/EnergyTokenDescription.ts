import { LocationType } from '@gamepark/king-of-tokyo-duel/material/LocationType'
import { TokenDescription } from "@gamepark/react-game";
import Energy from '../images/tokens/energy.png'
import { EnergyTokenHelp } from './help/EnergyTokenHelp';

export class EnergyTokenDescription extends TokenDescription {
  height = 1
  width = 0.9
  image = Energy

  stockLocation = { type: LocationType.EnergyStock }

  staticItem = { quantity: 20, location: this.stockLocation }

  help = EnergyTokenHelp

}

export const energyTokenDescription = new EnergyTokenDescription()