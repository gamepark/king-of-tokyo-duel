import { Monster } from '../../../material/Monster'
import { EffectType } from '../../effects/EffectType'
import { Memory } from '../../Memory'
import { RuleId } from '../../RuleId'
import { KeepRule } from '../KeepRule'


export class SuperConductorKeepRule extends KeepRule {
  onGainEnergy(player: Monster, count: number) {
    if (this.remind(Memory.Phase) === RuleId.ResolveDice && this.cardPlayer !== player) {
      this.unshiftEffect({ type: EffectType.SuperConductor, count }, this.cardPlayer)
    }
  }
}