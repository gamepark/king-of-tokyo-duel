import { CustomMove, isMoveItemType, ItemMove } from '@gamepark/rules-api'
import { PowerCard } from '../material/cards/PowerCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { CustomMoveType } from './CustomMoveType'
import { HealHelper } from './helper/HealHelper'
import { isChangingRule } from './IsChangingRule'
import { RuleId } from './RuleId'

export class HibernationRule extends BasePlayerTurnRule {
  getPlayerMoves() {
    const moves = super.getPlayerMoves()
    moves.push(
      this.hibernation.moveItem({
        type: LocationType.Discard
      })
    )

    moves.push(this.customMove(CustomMoveType.Ignore))
    return moves
  }

  onCustomMove(move: CustomMove) {
    const moves = super.onCustomMove(move)
    if (moves.some(isChangingRule)) return moves
    moves.push(...new HealHelper(this.game, this.player).heal(6))
    moves.push(this.startRule(RuleId.ChangePlayer))
    return moves
  }

  afterItemMove(move: ItemMove) {
    const moves = super.afterItemMove(move)
    if (moves.some(isChangingRule)) return moves
    if (!isMoveItemType(MaterialType.PowerCard)(move) || move.location.type !== LocationType.Discard) return moves
    moves.push(this.startRule(RuleId.RollDice))
    return moves
  }

  get hibernation() {
    return this
      .material(MaterialType.PowerCard)
      .id(PowerCard.Hibernation)

  }
}