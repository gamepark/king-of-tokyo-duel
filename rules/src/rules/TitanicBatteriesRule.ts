import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { PowerCard } from '../material/cards/PowerCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { CustomMoveType } from './CustomMoveType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class TitanicBatteriesRule extends BasePlayerTurnRule {
  getPlayerMoves() {
    return this
      .dice
      .moveItems({
        type: LocationType.OnPowerCard,
        parent: this.material(MaterialType.PowerCard).id(PowerCard.TitanicBatteries).getIndex(),
        player: this.rival
      })
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    const moves = super.onCustomMove(move)
    if (isCustomMoveType(CustomMoveType.Ignore)(move)) {
      moves.push(this.startRule(RuleId.ResolveDice))
    }

    return moves
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Dice)(move) || move.location.type !== LocationType.OnPowerCard) return []
    this.incrementIgnoredDice()
    if (this.ignoredDice === 2) {
      return [
        this.material(MaterialType.DiceToken).createItem({
          location: {
            type: LocationType.PlayerDiceToken,
            player: this.player
          }
        }),

        this.startRule(RuleId.ResolveDice)
      ]
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