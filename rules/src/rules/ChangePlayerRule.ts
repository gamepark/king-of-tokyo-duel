import { CustomMove, isCustomMoveType, MaterialMove } from '@gamepark/rules-api'
import { DiceColor } from '../material/DiceColor'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { CustomMoveType } from './CustomMoveType'
import { Memory, SetDiceOn } from './Memory'
import { RuleId } from './RuleId'

export class ChangePlayerRule extends BasePlayerTurnRule {

  onRuleStart() {
    const white = this.whiteDice.deck()
    const diceToSetApart = this.diceToSetApart
    const moves: MaterialMove[] = []
    const redDice = this.redDice.deck()
    for (let i = 0; i < diceToSetApart.length; i++) {
      const infos = diceToSetApart[i]
      if(moves.length === 6) break
      moves.push(
        redDice
          .dealOne({
            type: infos.location,
            parent: infos.parent
          })
      )
    }
    const nextPlayer = this.computeNextPlayer()

    if (!this.remind(Memory.Dominate) && redDice.length > 0) {
      moves.push(
        redDice
          .dealAtOnce({
            type: LocationType.PlayerHand,
            player: nextPlayer
          }, redDice.length)
      )
    }

    moves.push(
      white
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

  get diceToSetApart() {
    return this.remind<SetDiceOn[]>(Memory.SetDiceApart) ?? 0
  }

  onRuleEnd() {
    this.forget(Memory.RollCount)
    this.forget(Memory.BoughtCards)
    this.forget(Memory.Effects)
    this.forget(Memory.FreeTurn)
    this.forget(Memory.KeepCardPlayed)
    this.forget(Memory.RivalSmashCount)
    this.forget(Memory.SetDiceApart)
    this.forget(Memory.DiceFacesSolved)
    this.forget(Memory.SkipReboot)
    this.forget(Memory.ConsumedPower)
    this.forget(Memory.RefillRiver)
    this.forget(Memory.ExtraDiceFaces)
    if (this.remind(Memory.ActivePlayer) === this.remind(Memory.Immune)) {
      this.forget(Memory.Immune)
    }
    this.memorize(Memory.Round, (round: number) => round + 1)
    return []
  }
}