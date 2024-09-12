import { CustomMove, PlayerTurnRule } from '@gamepark/rules-api'
import { DiceColor } from '../material/DiceColor'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class RollDiceRule extends PlayerTurnRule {
  getPlayerMoves() {
    const rollCount = this.rollCount

    if (!rollCount) {
      return [this.customMove(CustomMoveType.RollDice)]
    }

    return [
      this.startRule(RuleId.PlayerTurn)
    ]
  }

  onCustomMove(_move: CustomMove) {
    const redDice = this.redDice
    const whiteDice = this.whiteDice

    this.memorize(Memory.RollCount, (roll) => roll++)
    return [
      ...redDice.rollItems(),
      ...whiteDice.rollItems(),
    ]
  }

  get redDice() {
    return this
      .material(MaterialType.Dice)
      .id(DiceColor.Red)
      .location((location) => !this.isFirstPlayerVeryFirstTurn? true: location.x !== 1)
  }

  get isFirstPlayerVeryFirstTurn() {
    return this.round === 1 && this.player === this.game.players[0]
  }

  get round() {
    return this.remind(Memory.Round)
  }

  get whiteDice() {
    return this
      .material(MaterialType.Dice)
      .id(DiceColor.White)
      .limit(this.additionalDice)
  }

  get additionalDice() {
    return this.remind(Memory.WhiteDice) ?? 0
  }

  get rollCount() {
    return this.remind(Memory.RollCount)
  }
}