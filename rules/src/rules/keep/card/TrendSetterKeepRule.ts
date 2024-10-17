import { Monster } from '../../../material/Monster'
import { EffectWithSource } from '../../effects/EffectWithSource'
import { Memory } from '../../Memory'
import { KeepRule } from '../KeepRule'

export class TrendSetterKeepRule extends KeepRule {

  canPreventDamagesOn(player: Monster): boolean {
    return !this.isConsumed && player === this.cardPlayer && this.isFameOnBuzzToken
  }

  get isFameOnBuzzToken() {
    // TODO: @rfromi
    return false
  }

  get preventionOrder() {
    return 10
  }

  preventDamages() {
    this.markKeepCardConsumed()
    this.effect.effect.count -= 1
    return []
  }

  get effect() {
    return (this.remind<EffectWithSource[]>(Memory.Effects) ?? [])[0]
  }
}