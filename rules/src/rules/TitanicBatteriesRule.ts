import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { PowerCard } from '../material/cards/PowerCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { CustomMoveType } from './CustomMoveType'
import { isChangingRule } from './IsChangingRule'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class TitanicBatteriesRule extends BasePlayerTurnRule {
  getPlayerMoves() {
    const moves = super.getPlayerMoves()
    moves.push(
      ...this
        .dice
        .moveItems({
          type: LocationType.OnPowerCard,
          parent: this.material(MaterialType.PowerCard).id(PowerCard.TitanicBatteries).getIndex(),
          player: this.rival
        })
    )

    return moves
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    const moves = super.onCustomMove(move)
    if (moves.some(isChangingRule)) return moves
    if (isCustomMoveType(CustomMoveType.Ignore)(move)) {
      moves.push(this.startRule(RuleId.ResolveDice))
    }

    return moves
  }

  afterItemMove(move: ItemMove) {
    const moves = super.afterItemMove(move)
    if (moves.some(isChangingRule)) return moves
    if (!isMoveItemType(MaterialType.Dice)(move) || move.location.type !== LocationType.OnPowerCard) return moves
    this.incrementIgnoredDice()
    if (this.ignoredDice === 2) {
      moves.push(
        this.material(MaterialType.DiceToken).createItem({
          location: {
            type: LocationType.PlayerDiceToken,
            player: this.player
          }
        })
      )

      moves.push(this.startRule(RuleId.ResolveDice))
      return moves
    }

    return []
  }

  get ignoredDice() {
    return this.remind(Memory.TitanicBatteries) ?? 0
  }

  incrementIgnoredDice() {
    this.memorize(Memory.TitanicBatteries, (count: number = 0) => count + 1)
  }

  get dice() {
    return this
      .material(MaterialType.Dice)
      .location(LocationType.PlayerRolledDice)
      .player(this.player)
  }

  onRuleEnd() {
    this.forget(Memory.TitanicBatteries)
    return []
  }

  // TODO: do effect and then call this.nextRuleMove
}