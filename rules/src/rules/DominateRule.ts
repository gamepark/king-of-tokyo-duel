import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove } from '@gamepark/rules-api'
import { DiceColor } from '../material/DiceColor'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { CustomMoveType } from './CustomMoveType'
import { isChangingRule } from './IsChangingRule'
import { RuleId } from './RuleId'

export class DominateRule extends BasePlayerTurnRule {

  getPlayerMoves() {
    const moves = super.getPlayerMoves()

    moves.push(
      ...this.keepCards.moveItems({
      type: LocationType.Discard
    }))

    moves.push(this.customMove(CustomMoveType.Dominated))

    return moves
  }

  onCustomMove(move: CustomMove) {
    const moves = super.onCustomMove(move)
    if (moves.some(isChangingRule)) return moves
    if (!isCustomMoveType(CustomMoveType.Dominated)(move)) return moves
    const rival = this.rival
    moves.push(
      this.redDice.moveItem({
        type: LocationType.PlayerHand,
        player: rival
      })
    )

    moves.push(this.startPlayerTurn(RuleId.RollDice, rival))
    return moves
  }

  afterItemMove(move: ItemMove) {
    const moves = super.afterItemMove(move)
    if (!isMoveItemType(MaterialType.PowerCard)(move)) return moves

    moves.push(this.startPlayerTurn(RuleId.RollDice, this.rival))
    return moves
  }

  get rival() {
    return this.game.players.find((p) => p !== this.player)!
  }

  get keepCards() {
    return this
      .material(MaterialType.PowerCard)
      .location(LocationType.PlayerKeepCards)
      .player(this.player)
  }

  get redDice() {
    return this
      .material(MaterialType.Dice)
      .id(DiceColor.Red)
      .location(LocationType.PlayerHand)
      .player(this.player)
      .maxBy((item) => item.location.x!)
  }
}