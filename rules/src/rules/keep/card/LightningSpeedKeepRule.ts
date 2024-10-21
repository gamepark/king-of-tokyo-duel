import { Buzz, getBuzzEffect, getBuzzSpaces } from '../../../material/Buzz'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { Pawn } from '../../../material/Pawn'
import { EffectType } from '../../effects/EffectType'
import { KeepRule } from '../KeepRule'

export class LightningSpeedKeepRule extends KeepRule {
  afterPullPawn(pawn: Pawn) {
    if (this.getActivePlayer() !== this.cardPlayer) return []
    const location = this.material(MaterialType.Pawn).id(pawn).getItem()!.location
    const buzz = this.getBuzzAtX(location.type!, location.x!).getItem()
    if (buzz && buzz.id !== Buzz.TheKingBuzz) {
      const effect = getBuzzEffect(buzz, location)
      if (!effect) {
        this.unshiftEffect({ type: EffectType.Smash, count: 1 }, this.rival)
      }
    }
    return []
  }

  getBuzzAtX(track: LocationType, x: number) {
    return this.material(MaterialType.Buzz).location(track)
      .filter(item => getBuzzSpaces(item.location, item.id).some(space => Math.abs(space.x - x) <= 0.5))
  }
}