import { DiceFace } from '../../../material/DiceFace'
import { MaterialType } from '../../../material/MaterialType'
import { KeepRule } from '../KeepRule'
import times from 'lodash/times'

export class AdrenalineAugmentKeepRule extends KeepRule {
  get bonusDiceFaces(): DiceFace[] {
    if (this.getActivePlayer() !== this.cardPlayer) return []
    const countPawnsInSpotlightZone = this.countPawnsInSpotlightZone;
    if (!countPawnsInSpotlightZone) return []
    return times(countPawnsInSpotlightZone, (_) => DiceFace.Claw)
  }

  get countPawnsInSpotlightZone() {
    return this
      .material(MaterialType.Pawn)
      .location((location) => 5 >= Math.abs(location.x!) && Math.abs(location.x!) >= 3)
      .length
  }


}