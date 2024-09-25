import { CustomMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class RollDiceRule extends PlayerTurnRule {
  getPlayerMoves() {
    const rollCount = this.rollCount

    if (!rollCount) {
      return [this.customMove(CustomMoveType.Roll)]
    }

    const takeDiceInHand = this.rolledDice.moveItems(({ location: { x, type, ...rest }}) => ({ ...rest, type: LocationType.PlayerHand }))
    const undoTakeDice = this.diceInHand.moveItems(({ location: { x, type, ...rest }}) => ({ ...rest, type: LocationType.PlayerRolledDice }))
    return [
      ...takeDiceInHand,
      ...undoTakeDice,
      this.customMove(CustomMoveType.Roll),
      this.goToPhase2()
    ]
  }

  onCustomMove(move: CustomMove) {
    const moves: MaterialMove[] = []
    this.memorize(Memory.RollCount, (roll: number) => (roll ?? 0) + 1)
    if (move.type === CustomMoveType.Roll) {
      moves.push(
        ...this.diceInHand.rollItems({
          type: LocationType.PlayerRolledDice,
          player: this.player
        })
      )
    }

    if (this.rollCount === 3) {
      moves.push(this.goToPhase2())
    }

    return moves
  }

  goToPhase2(): MaterialMove {
    return this.startRule(RuleId.GainEnergy)
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