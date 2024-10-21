import { getBuzzSpaces } from '../../../material/Buzz'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { Monster } from '../../../material/Monster'
import { Pawn } from '../../../material/Pawn'
import { Smash } from '../../effects/EffectType'
import { EffectWithSource } from '../../effects/EffectWithSource'
import { Memory } from '../../Memory'
import { KeepRule } from '../KeepRule'

export class TrendSetterKeepRule extends KeepRule {

  canPreventDamagesOn(player: Monster): boolean {
    return !this.isConsumed && player === this.cardPlayer && this.isFameOnBuzzToken
  }

  get isFameOnBuzzToken() {
    const famePawnX = this.material(MaterialType.Pawn).id(Pawn.Fame).getItem()!.location.x!
    return this.material(MaterialType.Buzz).location(LocationType.FameTrack).getItems()
      .some(item => getBuzzSpaces(item.location, item.id).some(space => Math.abs(space.x - famePawnX) <= 0.5))
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
    return this.remind<EffectWithSource<Smash>>(Memory.CurrentEffect)
  }
}