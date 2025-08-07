import { MaterialMove } from '@gamepark/rules-api'
import { diceFaces } from '../../../material/DiceFace'
import { Pawn } from '../../../material/Pawn'
import { EffectType } from '../../effects/EffectType'
import { RollHelper } from '../../helper/RollHelper'
import { KeepRule } from '../KeepRule'


export class UtterDestructionKeepRule extends KeepRule {
  afterRollingDice(): MaterialMove[] {
    if (this.getActivePlayer() !== this.cardPlayer) return []

    const rollHelper = new RollHelper(this.game)
    const moves: MaterialMove[] = []
    if (diceFaces.every(face => rollHelper.countFace(face) > 0)) {
      this.pushEffect({
        type: EffectType.PullPawn,
        pawn: Pawn.Destruction,
        count: 2
      }, this.cardPlayer)

      this.pushEffect({
        type: EffectType.PullPawn,
        pawn: Pawn.Fame,
        count: 2
      }, this.cardPlayer)

      this.pushEffect({
        type: EffectType.Smash,
        count: 2
      }, this.rival)
    }

    return moves
  }
}
