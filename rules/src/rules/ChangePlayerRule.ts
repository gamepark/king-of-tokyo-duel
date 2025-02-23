import { MaterialMove } from '@gamepark/rules-api'
import { DiceColor } from '../material/DiceColor'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { Memory, SetDiceOn } from './Memory'
import { RuleId } from './RuleId'

export class ChangePlayerRule extends BasePlayerTurnRule {

  onRuleStart() {
    const white = this.whiteDice.deck()
    const diceToSetApart = this.diceToSetApart
    const moves: MaterialMove[] = []
    const redDice = this.redDice.deck()
    const nextPlayer = this.computeNextPlayer()

    // In case the player has a free turn, the immunity must be removed
    const immune = this.remind(Memory.Immune)
    const opponentIsImmune = immune !== undefined && immune !== this.player
    if (this.hasFreeTurn && opponentIsImmune) {
      this.forget(Memory.Immune)
    }


    if (redDice.length < 6) {
      moves.push(
        this.material(MaterialType.Dice)
          .createItem({
            id: DiceColor.Red,
            location: {
              type: LocationType.PlayerDiceRoll,
              player: nextPlayer
            }
          })
      )
    }

    for (let i = 0; i < diceToSetApart.length; i++) {
      const infos = diceToSetApart[i]
      if (moves.length >= redDice.length) break
      moves.push(
        redDice
          .dealOne({
            type: infos.location,
            parent: infos.parent
          })
      )
    }

    if (!this.remind(Memory.Dominate) && redDice.length > 0) {
      moves.push(
        redDice
          .dealAtOnce({
            type: LocationType.PlayerDiceRoll,
            player: nextPlayer
          }, redDice.length)
      )
    }

    if (white.length) {
      moves.push(white.moveItemsAtOnce({ type: LocationType.WhiteDiceStock }))
    }

    this.memorize(Memory.ActivePlayer, nextPlayer)
    this.forget(Memory.FreeTurn)

    if (nextPlayer === this.player) {
      moves.push(this.startRule(RuleId.OnStartTurn))
    } else {
      moves.push(this.startPlayerTurn(RuleId.OnStartTurn, nextPlayer))
    }

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
      .location((l) => l.type !== LocationType.WhiteDiceStock)
    // Sometimes dice is on card that has no player. In practice, all white dice must go in stock when player change
    //.player(this.player)
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
    if (this.remind(Memory.ActivePlayer) === this.remind(Memory.Immune)) {
      this.forget(Memory.Immune)
    }
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
    this.memorize(Memory.Round, (round: number) => round + 1)
    return []
  }
}
