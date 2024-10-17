import { Monster } from '../../../material/Monster'
import { Smash } from '../../effects/EffectType'
import { EffectWithSource } from '../../effects/EffectWithSource'
import { Memory } from '../../Memory'
import { KeepRule } from '../KeepRule'

export class ArmorPlatingKeepRule extends KeepRule {

  canPreventDamagesOn(player: Monster): boolean {
    return !this.isConsumed && player === this.cardPlayer
  }

  get preventionOrder() {
    return 20
  }

  preventDamages() {
    this.markKeepCardConsumed()
    this.effect.effect.count -= 1
    return []
  }

  get effect() {
    return (this.remind<EffectWithSource<Smash>>(Memory.CurrentEffect))
  }
}