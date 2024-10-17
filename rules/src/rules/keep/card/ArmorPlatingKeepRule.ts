import { Monster } from '../../../material/Monster'
import { EffectWithSource } from '../../effects/EffectWithSource'
import { Memory } from '../../Memory'
import { KeepRule } from '../KeepRule'

// TODO : Prevent damages
export class ArmorPlatingKeepRule extends KeepRule {

  canPreventDamagesOn(player: Monster): boolean {
    return !this.isConsumed && player === this.cardPlayer
  }

  get preventionOrder() {
    return 20
  }

  preventDamages() {
    console.log("????", this.effect.effect.count)
    this.markKeepCardConsumed()
    this.effect.effect.count -= 1
    return []
  }

  get effect() {
    return (this.remind<EffectWithSource[]>(Memory.Effects) ?? [])[0]
  }
}