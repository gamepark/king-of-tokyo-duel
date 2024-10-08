import { getEnumValues, MaterialMove } from '@gamepark/rules-api'
import { DiceFace } from '../../../material/DiceFace'
import { Pawn } from '../../../material/Pawn'
import { EffectType } from '../../effects/EffectType'
import { KeepHelper } from '../../helper/KeepHelper'
import { KeepRule } from '../KeepRule'


export class UtterDestructionKeepRule extends KeepRule {
  afterRollingDice(): MaterialMove[] {
    if (this.getActivePlayer() !== this.cardPlayer) return []

    const moves: MaterialMove[] = []
    if (getEnumValues(DiceFace).every((face) => this.countDiceFaces(face) > 0)) {
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

  countDiceFaces(dice: DiceFace) {
    return this.rolledDice.rotation(dice).length
      + new KeepHelper(this.game).getBonusFaces(dice).length
  }
}