import { CustomMove, isCustomMoveType } from '@gamepark/rules-api'
import { CustomMoveType } from '../../CustomMoveType'
import { KeepRule } from '../KeepRule'

export class RegenerationKeepRule extends KeepRule {
  get healBonus(): number {
    if (this.getActivePlayer() !== this.cardPlayer || this.isConsumed) return 0
    return 1
  }

  onCustomMove(move: CustomMove) {
    if (!isCustomMoveType(CustomMoveType.Smash)(move)) return []
    if (move.data.preventedDamages > 0) this.markKeepCardConsumed()
    return []
  }
}