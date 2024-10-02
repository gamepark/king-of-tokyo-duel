import { MaterialMove } from '@gamepark/rules-api'
import { Pawn } from '../../../material/Pawn'
import { Memory } from '../../Memory'
import { RuleId } from '../../RuleId'
import { KeepRule } from '../KeepRule'


export class ThunderStompKeepRule extends KeepRule {
  afterPullPawn(pawn: Pawn, _count: number): MaterialMove[] {
    if (this.getActivePlayer() !== this.cardPlayer || pawn !== Pawn.Destruction) return []
    if (this.game.rule?.id !== RuleId.PullFamePawn) return []
    this.memorize(Memory.DecreaseDiceCount, 1)
    return []
  }
}