import { MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '../../../material/MaterialType'
import { Monster } from '../../../material/Monster'
import { Smash } from '../../effects/EffectType'
import { EffectWithSource } from '../../effects/EffectWithSource'
import { Memory } from '../../Memory'
import { RuleId } from '../../RuleId'
import { KeepRule } from '../KeepRule'

export class CamouflageKeepRule extends KeepRule {
  canPreventDamagesOn(player: Monster) {
    const smashEffect = this.remind<EffectWithSource<Smash>>(Memory.CurrentEffect)
    return player === this.cardPlayer
      && !smashEffect.sources.some(source => source.type === MaterialType.PowerCard && source.indexes.includes(this.cardIndex))
  }

  get preventionOrder(): number {
    return 0
  }

  preventDamages(): MaterialMove[] {
    return [this.startRule(RuleId.Camouflage)]
  }
}