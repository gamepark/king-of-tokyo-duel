import { CustomMove, isMoveItemType, isRollItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Monster } from '../material/Monster'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { CustomMoveType } from './CustomMoveType'
import { KeepHelper } from './helper/KeepHelper'
import { Memory } from './Memory'
import { AlienoidRule } from './power/AlienoidRule'
import { RuleId } from './RuleId'

export class RollDiceRule extends BasePlayerTurnRule {
  onRuleStart() {
    this.memorize(Memory.Phase, RuleId.RollDice)
    const moves = this.getFreeWhiteDiceMoves()
    if (!moves.length && !this.diceToRoll && !this.diceToken.length) {
      return this.goToPhase2()
    }
    return moves
  }

  getFreeWhiteDiceMoves(): MaterialMove[] {
    const additionalDice = Math.min(new KeepHelper(this.game).additionalDice, 2)
    if (!additionalDice || !this.whiteDice.length) return []
    return [this
      .whiteDice
      .limit(additionalDice)
      .moveItemsAtOnce({
        type: LocationType.PlayerDiceRoll,
        player: this.player
      })]
  }

  getPlayerMoves() {
    const rollCount = this.rollCount
    const moves: MaterialMove[] = super.getPlayerMoves()
    if (!rollCount) {
      moves.push(
        ...this.diceToken.moveItems({ type: LocationType.WhiteTokenStock }, 1)
      )
      moves.push(this.customMove(CustomMoveType.Roll))
      return moves
    }


    const diceToRoll = this.diceToRoll
    moves.push(...diceToRoll.moveItems(item => ({ type: LocationType.PlayerDiceKeep, player: this.player, rotation: item.location.rotation })))

    const diceICanReroll = this.diceICanReroll
    moves.push(...diceICanReroll.moveItems(item => ({ type: LocationType.PlayerDiceRoll, player: this.player, rotation: item.location.rotation })))

    if (diceToRoll.length) {
      moves.push(this.customMove(CustomMoveType.Roll))
    }

    moves.push(this.customMove(CustomMoveType.Pass))

    return moves
  }

  get diceICanReroll() {
    if (this.rollCount >= this.maxRollCount) {
      const keepHelper = new KeepHelper(this.game)
      return this.keepDice.filter((item) => keepHelper.canReroll(item.location.rotation))
    }
    return this.keepDice
  }

  afterItemMove(move: ItemMove) {
    const moves: MaterialMove[] = super.afterItemMove(move)
    if (isMoveItemType(MaterialType.DiceToken)(move)) {
      moves.push(
        this.whiteDice.moveItem({
          type: LocationType.PlayerDiceRoll,
          player: this.player
        })
      )
    } else if (isRollItemType(MaterialType.Dice)(move) && move.location.type === LocationType.PlayerDiceKeep) {
      const diceRoll = this.material(MaterialType.Dice).location(LocationType.PlayerDiceRoll)
      if (diceRoll.length === 0 && this.diceICanReroll.length === 0) {
        moves.push(...this.goToPhase2())
      }
    }
    return moves
  }

  onCustomMove(move: CustomMove) {
    const diceToRoll = this.diceToRoll
    switch (move.type) {
      case CustomMoveType.Pass:
        return [
          ...diceToRoll.moveItems(item => ({ type: LocationType.PlayerDiceKeep, player: this.player, rotation: item.location.rotation })),
          ...this.goToPhase2()
        ]
      case CustomMoveType.Roll:
        this.memorize(Memory.RollCount, (roll: number) => (roll ?? 0) + 1)
        return [
          diceToRoll.moveItemsAtOnce({ type: LocationType.PlayerDiceRoll }),
          ...diceToRoll.rollItems({ type: this.rollCount >= this.maxRollCount? LocationType.PlayerDiceKeep: LocationType.PlayerDiceRoll, player: this.player })
        ]
    }
    return []
  }

    goToPhase2()
  :
    MaterialMove[]
    {
      if (this.player === Monster.Alienoid && new AlienoidRule(this.game).canUsePower()) {
        return [this.startRule(RuleId.Alienoid)]
      }
      new KeepHelper(this.game).afterRollingDice()
      if (this.effects.length) {
        this.memorize(Memory.Phase, RuleId.ResolveDice)
        return [this.startRule(RuleId.Effect)]
      }

      return [this.startRule(RuleId.ResolveDice)]
    }

    get
    maxRollCount()
    {
      return 3 + new KeepHelper(this.game).additionalRolls
    }

    get
    rollCount()
    {
      return this.remind(Memory.RollCount)
    }

    get
    keepDice()
    {
      return this
        .material(MaterialType.Dice)
        .location(LocationType.PlayerDiceKeep)
        .player(this.player)
    }

    get
    diceToRoll()
    {
      return this
        .material(MaterialType.Dice)
        .location(LocationType.PlayerDiceRoll)
        .player(this.player)
        .sort((item) => item.location.x!)
    }

    get
    diceToken()
    {
      return this
        .material(MaterialType.DiceToken)
        .player(this.player)
    }

    get
    whiteDice()
    {
      return this
        .material(MaterialType.Dice)
        .location(LocationType.WhiteDiceStock)
    }
  }