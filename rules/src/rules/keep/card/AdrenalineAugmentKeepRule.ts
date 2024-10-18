import { DiceFace } from '../../../material/DiceFace'
import { MaterialType } from '../../../material/MaterialType'
import { KeepRule } from '../KeepRule'

export class AdrenalineAugmentKeepRule extends KeepRule {
  getBonusFaces(face:DiceFace) {
    if (this.getActivePlayer() !== this.cardPlayer) return
    if (face !== DiceFace.Claw) return
    const countPawnsInSpotlightZone = this.countPawnsInSpotlightZone;
    if (!countPawnsInSpotlightZone) return
    return {
      type: MaterialType.PowerCard,
      indexes: [this.cardIndex],
      count: countPawnsInSpotlightZone
    }
  }

  get countPawnsInSpotlightZone() {
    return this
      .material(MaterialType.Pawn)
      .location((location) => 5 >= Math.abs(location.x!) && Math.abs(location.x!) >= 3)
      .length
  }


}