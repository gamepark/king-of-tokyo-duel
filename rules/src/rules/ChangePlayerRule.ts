import { CustomMove, isCustomMoveType, MaterialMove } from '@gamepark/rules-api'
import { DiceColor } from '../material/DiceColor'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { CustomMoveType } from './CustomMoveType'
import { KeepHelper } from './helper/KeepHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class ChangePlayerRule extends BasePlayerTurnRule {

  onRuleStart() {
    const white = this.whiteDice
    const additionalDice = Math.min(new KeepHelper(this.game).additionalDice, 2)
    const removedDice = Math.min(this.removedDice, 6)
    const nextPlayer = this.computeNextPlayer()
    const moves: MaterialMove[] = []

    if (!this.remind(Memory.Dominate)) {
      moves.push(
        this
          .redDice
          .limit(6 - removedDice)
          .moveItemsAtOnce({
            type: LocationType.PlayerHand,
            player: nextPlayer
          })
      )
    }

    if (additionalDice) {
      moves.push(
        white.limit(additionalDice)
          .moveItemsAtOnce({
            type: LocationType.PlayerHand,
            player: nextPlayer
          })
      )
    }

    moves.push(
      white.limit(2 - additionalDice)
        .moveItemsAtOnce({
          type: LocationType.WhiteDiceStock,
          player: nextPlayer
        })
    )

    moves.push(this.customMove(CustomMoveType.ChangePlayer))

    return moves
  }

  onCustomMove(move: CustomMove) {
    const moves: MaterialMove[] = []
    const nextPlayer = this.computeNextPlayer()
    if (!isCustomMoveType(CustomMoveType.ChangePlayer)(move)) return moves
    this.memorize(Memory.ActivePlayer, nextPlayer)
    this.forget(Memory.FreeTurn)

    moves.push(this.startPlayerTurn(RuleId.OnStartTurn, nextPlayer))
    return moves
  }

  get hasFreeTurn() {
    return !!this.remind(Memory.FreeTurn)
  }

  computeNextPlayer() {
    return this.hasFreeTurn ? this.player : this.nextPlayer
  }

  get whiteDice() {
    return this
      .material(MaterialType.Dice)
      .id(DiceColor.White)
      .player(this.player)
  }

  get redDice() {
    return this
      .material(MaterialType.Dice)
      .id(DiceColor.Red)
  }

  get removedDice() {
    return this.remind(Memory.DecreaseDiceCount) ?? 0
  }

  onRuleEnd() {
    this.forget(Memory.RollCount)
    this.forget(Memory.BoughtCards)
    this.forget(Memory.Effects)
    this.forget(Memory.FreeTurn)
    this.forget(Memory.KeepCardPlayed)
    this.forget(Memory.RivalSmashCount)
    this.forget(Memory.DecreaseDiceCount)
    this.forget(Memory.DiceFacesSolved)
    this.forget(Memory.SkipReboot)
    this.forget(Memory.ConsumedPower)
    if (this.remind(Memory.ActivePlayer) === this.remind(Memory.Immune)) {
      this.forget(Memory.Immune)
    }
    this.memorize(Memory.Round, (round: number) => round + 1)
    return []
  }
}