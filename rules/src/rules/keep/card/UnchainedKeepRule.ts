import { MaterialType } from '../../../material/MaterialType'
import { EffectType } from '../../effects/EffectType'
import { EffectWithSource } from '../../effects/EffectWithSource'
import { KeepRule } from '../KeepRule'


export class UnchainedKeepRule extends KeepRule {
  get buzzBonusAlternatives(): EffectWithSource | undefined {
    if (this.getActivePlayer() !== this.cardPlayer) return
    return {
      sources: [{ type: MaterialType.PowerCard, indexes: [this.cardIndex], count: 1 }],
      target: this.rival,
      effect: { type: EffectType.Smash, count: 1 }
    }
  }
}