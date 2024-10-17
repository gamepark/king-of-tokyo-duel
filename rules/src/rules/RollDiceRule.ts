import { CustomMove, isCustomMoveType, isDeleteItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { CustomMoveType } from './CustomMoveType'
import { KeepHelper } from './helper/KeepHelper'
import { isChangingRule } from './IsChangingRule'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class RollDiceRule extends BasePlayerTurnRule {
  onRuleStart() {
    this.memorize(Memory.Phase, RuleId.RollDice)
    if (!this.diceInHand && !this.diceToken.length) return [this.customMove(CustomMoveType.Pass)]
    return []
  }

  getPlayerMoves() {
    const rollCount = this.rollCount
    const moves: MaterialMove[] = super.getPlayerMoves()
    if (!rollCount) {
      moves.push(
        ...this.diceToken.deleteItems(1)
      )
      moves.push(this.customMove(CustomMoveType.Roll))
      return moves
    }


    const takeDiceInHand = this.getDiceInHand()
    if (takeDiceInHand.length) {
      moves.push(this.customMove(CustomMoveType.RollAll))
    }

    const diceInHand = this.diceInHand

    const undoTakeDice = diceInHand.moveItems(({ location: { x, type, ...rest } }) => ({ ...rest, type: LocationType.PlayerRolledDice }))
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
    return rolledDice.moveItems(({ location: { x, type, ...rest } }) => ({ ...rest, type: LocationType.PlayerHand }))
  }

  afterItemMove(move: ItemMove) {
    const moves: MaterialMove[] = super.afterItemMove(move)
    if (!isDeleteItemType(MaterialType.DiceToken)(move)) return moves
    moves.push(
      this.whiteDice.moveItem({
        type: LocationType.PlayerHand,
        player: this.player
      })
    )

    return moves
  }

  onCustomMove(move: CustomMove) {
    const moves: MaterialMove[] = super.onCustomMove(move)
    if (moves.some(isChangingRule)) return moves
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

      if (!this.canRollADice) {
        moves.push(this.customMove(CustomMoveType.Pass))
      }
    }

    return moves
  }

  goToPhase2(): MaterialMove[] {
    new KeepHelper(this.game).afterRollingDice()
    if (this.effects.length) {
      this.memorize(Memory.Phase, RuleId.ResolveDice)
      return [this.startRule(RuleId.Effect)]
    }

    return [this.startRule(RuleId.ResolveDice)]
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

  get diceToken() {
    return this
      .material(MaterialType.DiceToken)
      .player(this.player)
  }

  get whiteDice() {
    return this
      .material(MaterialType.Dice)
      .location(LocationType.WhiteDiceStock)
  }
}