import { CustomMove, isCustomMoveType, MaterialMove } from '@gamepark/rules-api'
import { PowerCard } from '../material/cards/PowerCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { CustomMoveType } from './CustomMoveType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class RebootingRule extends BasePlayerTurnRule {
  onRuleStart() {
    return []
  }
  getPlayerMoves() {
    const moves: MaterialMove[] = []
    moves.push(this.customMove(CustomMoveType.Ignore))
    moves.push(this.customMove(CustomMoveType.SkipResolving))
    return moves
  }

  onCustomMove(move: CustomMove) {
    const moves: MaterialMove[] = []
    if (isCustomMoveType(CustomMoveType.Ignore)(move)) {
      this.memorize(Memory.SkipReboot, true)
      moves.push(this.startRule(RuleId.ResolveDice))
    }

    if (isCustomMoveType(CustomMoveType.SkipResolving)(move)) {
      moves.push(this.rebooting.moveItem({
        type: LocationType.Discard
      }))
      moves.push(this.startRule(RuleId.Buy))
    }

    return moves
  }

  get rebooting() {
    return this
      .material(MaterialType.PowerCard)
      .id(PowerCard.Rebooting)
      .player(this.player)
  }
}