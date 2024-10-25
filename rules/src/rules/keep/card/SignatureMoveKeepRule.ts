import { DiceFace } from '../../../material/DiceFace'
import { Pawn } from '../../../material/Pawn'
import { EffectType } from '../../effects/EffectType'
import { RollHelper } from '../../helper/RollHelper'
import { KeepRule } from '../KeepRule'


export class SignatureMoveKeepRule extends KeepRule {
  afterRollingDice() {
    if (this.getActivePlayer() !== this.cardPlayer) return
    const pullCount = Math.floor(new RollHelper(this.game).countFace(DiceFace.Power) / 3)
    if (!pullCount) return
    this.pushEffect({
      type: EffectType.PullPawn,
      pawn: Pawn.Fame,
      count: pullCount
    }, this.cardPlayer)
  }
}