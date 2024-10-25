import { DiceFace } from '../../../material/DiceFace'
import { Pawn } from '../../../material/Pawn'
import { EffectType } from '../../effects/EffectType'
import { RollHelper } from '../../helper/RollHelper'
import { KeepRule } from '../KeepRule'

export class GentleGiantKeepRule extends KeepRule {
  afterResolvingDice() {
    if (this.getActivePlayer() !== this.cardPlayer || this.isConsumed) return []
    if (new RollHelper(this.game).countFace(DiceFace.Claw) === 0) {
      this.markKeepCardConsumed()
      this.pushEffect({
        type: EffectType.PullPawn,
        pawn: Pawn.Fame,
        count: 1
      }, this.cardPlayer)
    }

    return []
  }
}