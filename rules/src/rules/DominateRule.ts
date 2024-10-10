import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { DiceColor } from '../material/DiceColor'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { CustomMoveType } from './CustomMoveType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class DominateRule extends BasePlayerTurnRule {

  getPlayerMoves() {
    const moves = super.getPlayerMoves()
    if (!this.keepCards.length) return [this.startRule(RuleId.RollDice)]

    moves.push(
      ...this.keepCards.moveItems({
        type: LocationType.Discard
      }))

    moves.push(this.customMove(CustomMoveType.Dominated))
    return moves
  }

  onCustomMove(move: CustomMove) {
    if (!isCustomMoveType(CustomMoveType.Dominated)(move)) return []
    const moves: MaterialMove[] = []
    const removedDice = Math.min((this.remind(Memory.DecreaseDiceCount) ?? 0) + this.keepCards.length, 6)
    moves.push(
      this
        .redDice
        .limit(6 - removedDice)
        .moveItemsAtOnce({
          type: LocationType.PlayerHand,
          player: this.player
        })
    )

    moves.push(this.startRule(RuleId.RollDice))

    return moves
  }

  afterItemMove(move: ItemMove) {
    const moves = super.afterItemMove(move)
    if (!isMoveItemType(MaterialType.PowerCard)(move)) return moves
    if (!this.keepCards.length) return [this.startPlayerTurn(RuleId.Effect, this.rival)]
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
  }

  onRuleEnd() {
    this.forget(Memory.Dominate)
    return []
  }
}