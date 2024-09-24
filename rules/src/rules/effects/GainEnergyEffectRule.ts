import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { AbstractEffectRule } from './AbstractEffectRule'
import { GainEnergy } from './EffectType'

export class GainEnergyEffectRule extends AbstractEffectRule<GainEnergy> {
  getMoves() {
    return [
      this
        .material(MaterialType.Energy)
        .createItem({
          location: {
            type: LocationType.PlayerEnergy,
            player: this.player
          },
          quantity: this.effect.count
        })
    ]
  }
}