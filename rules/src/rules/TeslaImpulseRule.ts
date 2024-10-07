import { isMoveItemType, ItemMove } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { isChangingRule } from './IsChangingRule'
import { RuleId } from './RuleId'

export class TeslaImpulseRule extends BasePlayerTurnRule {
  getPlayerMoves() {
    const moves = super.getPlayerMoves()
    moves.push(
      ...this.rivalKeepCards.moveItems({
        type: LocationType.Discard
      })
    )

    return moves
  }

  afterItemMove(move: ItemMove) {
    const moves = super.afterItemMove(move)
    if (moves.some(isChangingRule)) return moves
    if (!isMoveItemType(MaterialType.PowerCard)(move) || move.location.type !== LocationType.Discard) return []
    return [this.startRule(RuleId.Effect)]
  }

  get rivalKeepCards() {
    return this
      .material(MaterialType.PowerCard)
      .location(LocationType.PlayerKeepCards)
      .player(this.rival)
  }
}