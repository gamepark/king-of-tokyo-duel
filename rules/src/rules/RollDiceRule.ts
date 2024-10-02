import { CustomMove, isCustomMoveType, isEndGame, isStartPlayerTurn, isStartRule, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { CustomMoveType } from './CustomMoveType'
import { KeepHelper } from './helper/KeepHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class RollDiceRule extends BasePlayerTurnRule {
  onRuleStart() {
    return new KeepHelper(this.game).atStartOfTurn()
  }

  getPlayerMoves() {
    const rollCount = this.rollCount

    if (!rollCount) {
      return [this.customMove(CustomMoveType.Roll)]
    }


    const moves: MaterialMove[] = []
    const takeDiceInHand = this.getDiceInHand()
    if (takeDiceInHand.length) {
      moves.push(this.customMove(CustomMoveType.RollAll))
    }

    const diceInHand = this.diceInHand

    const undoTakeDice = diceInHand.moveItems(({ location: { x, type, ...rest }}) => ({ ...rest, type: LocationType.PlayerRolledDice }))
    moves.push(...takeDiceInHand)
    moves.push(...undoTakeDice)

    if (diceInHand.length) {
      moves.push(this.customMove(CustomMoveType.Roll))
    }

    if (!diceInHand.length) {
      moves.push(this.customMove(CustomMoveType.Pass))
    }

    return moves
  }

  getDiceInHand() {
    let rolledDice = this.rolledDice
    const keepHelper = new KeepHelper(this.game)
    if (this.rollCount >= this.maxRollCount) {
      rolledDice = rolledDice.filter((item) => keepHelper.canReroll(item.location.rotation))
    }
    return rolledDice.moveItems(({ location: { x, type, ...rest }}) => ({ ...rest, type: LocationType.PlayerHand }))
  }

  onCustomMove(move: CustomMove) {
    const moves: MaterialMove[] = super.onCustomMove(move)
    if (isCustomMoveType(CustomMoveType.RollAll)(move)) {
      moves.push(...this.getDiceInHand())
      moves.push(this.customMove(CustomMoveType.Roll))
      return moves
    }

    this.memorize(Memory.RollCount, (roll: number) => (roll ?? 0) + 1)

    if (isCustomMoveType(CustomMoveType.Pass)(move)) {
      return this.goToPhase2()
    }

    if (isCustomMoveType(CustomMoveType.Roll)(move)) {
      moves.push(
        ...this.diceInHand.rollItems({
          type: LocationType.PlayerRolledDice,
          player: this.player
        })
      )
    }

    if (!this.canRollADice) {
      moves.push(this.customMove(CustomMoveType.Pass))
    }

    return moves
  }

  goToPhase2(): MaterialMove[] {
    const moves = new KeepHelper(this.game).afterRollingDice()
    if (moves.some((move) => isStartPlayerTurn(move) || isStartRule(move) || isEndGame(move))) {
      return moves
    }

    moves.push(this.startRule(RuleId.ResolveDice))
    return moves
  }

  get canRollADice() {
    if (this.rollCount < this.maxRollCount) return true
    const keepHelper = new KeepHelper(this.game)
    return this
      .rolledDice
      .filter((item) => keepHelper.canReroll(item.location.rotation))
      .length > 0
  }

  get maxRollCount() {
    return 3 + new KeepHelper(this.game).additionalRolls
  }

  get rollCount() {
    return this.remind(Memory.RollCount)
  }

  get rolledDice() {
    return this
      .material(MaterialType.Dice)
      .location(LocationType.PlayerRolledDice)
      .player(this.player)
  }

  get diceInHand() {
    return this
      .material(MaterialType.Dice)
      .location(LocationType.PlayerHand)
      .player(this.player)
      .sort((item) => item.location.x!)
  }
}