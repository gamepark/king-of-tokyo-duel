import { EffectType } from '../../effects/EffectType'
import { Memory } from '../../Memory'
import { KeepRule } from '../KeepRule'


export class SuperConductorKeepRule extends KeepRule {
  afterResolvingDice() {
    if (this.getActivePlayer() === this.cardPlayer) return
    if (!this.remind(Memory.ResolveDiceEnergyGain)) return
    this.unshiftEffect({ type: EffectType.SuperConductor }, this.cardPlayer)
  }
}