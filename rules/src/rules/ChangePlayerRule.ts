import { PlayerTurnRule } from "@gamepark/rules-api";
import { DiceColor } from "../material/DiceColor";
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class ChangePlayerRule extends PlayerTurnRule {

  onRuleStart() {
    const nextPlayer = this.nextPlayer
    return [
      this.whiteDice
        .moveItemsAtOnce({
          type: LocationType.WhiteDiceStock,
          player: nextPlayer
        }),
      this.redDice
        .moveItemsAtOnce({
          type: LocationType.PlayerHand,
          player: nextPlayer
        }),
      this.startPlayerTurn(RuleId.RollDice, nextPlayer)
    ]
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
      .player(this.player)
  }

  onRuleEnd() {
    this.forget(Memory.RollCount)
    this.memorize(Memory.Round, (round: number) => round + 1)
    return []
  }
}