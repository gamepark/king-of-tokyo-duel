import { Pawn } from '../../../material/Pawn'
import { Memory } from '../../Memory'
import { RuleId } from '../../RuleId'
import { KeepRule } from '../KeepRule'


export class ThunderStompKeepRule extends KeepRule {
  afterPullPawn(pawn: Pawn) {
    if (this.getActivePlayer() !== this.cardPlayer || pawn !== Pawn.Destruction) return
    if (this.remind(Memory.Phase) !== RuleId.ResolveDice) return
    this.memorize(Memory.DecreaseDiceCount, 1)
  }
}