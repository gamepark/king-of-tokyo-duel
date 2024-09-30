import { MaterialMove } from '@gamepark/rules-api'
import { Pawn } from '../../../material/Pawn'
import { Memory } from '../../Memory'
import { RuleId } from '../../RuleId'
import { KeepRule } from '../KeepRule'


export class ThunderStompKeepRule extends KeepRule {
  afterPullPawn(pawn: Pawn, _count: number): MaterialMove[] {
    console.log("????LKJLJ", this.cardPlayer, this.getActivePlayer())
    if (this.getActivePlayer() !== this.cardPlayer || pawn !== Pawn.Destruction) return []
    if (this.game.rule?.id !== RuleId.PullPawn) return []
    this.memorize(Memory.DecreaseDiceCount, 1)
    return []
  }
}