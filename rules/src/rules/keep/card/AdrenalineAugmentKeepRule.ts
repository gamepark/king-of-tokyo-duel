import { DiceFace } from '../../../material/DiceFace'
import { MaterialType } from '../../../material/MaterialType'
import { pawns } from '../../../material/Pawn'
import { GameOverRule } from '../../GameOverRule'
import { KeepRule } from '../KeepRule'

export class AdrenalineAugmentKeepRule extends KeepRule {
  getBonusFaces(face: DiceFace) {
    if (this.getActivePlayer() !== this.cardPlayer) return
    if (face !== DiceFace.Claw) return
    const countPawnsInSpotlightZone = pawns.filter(pawn => new GameOverRule(this.game).isPawnInSpotlightZone(pawn)).length
    if (!countPawnsInSpotlightZone) return
    return {
      type: MaterialType.PowerCard,
      indexes: [this.cardIndex],
      count: countPawnsInSpotlightZone
    }
  }
}
