import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { DiceFace } from '../material/DiceFace'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'

export class ResolveDiceRule extends PlayerTurnRule {

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(...this.getMoveToSolveArea(DiceFace.Energy))
    moves.push(...this.getMoveToSolveArea(DiceFace.Claw))
    moves.push(...this.getMoveToSolveArea(DiceFace.Star))
    moves.push(...this.getMoveToSolveArea(DiceFace.Destruction))
    moves.push(...this.getMoveToSolveArea(DiceFace.Heart))
    moves.push(...this.getMoveToSolveArea(DiceFace.Power))
    return moves
  }

  getMoveToSolveArea(face: DiceFace) {
    const dice = this.getDice(face)
    if (!dice.length) return []
    // TODO: handle properly card that allow to move other dice as the initial one
    if (this.hasOtherDiceInSolveArea(face)) return []
    return dice.moveItems((item) => ({
      type: LocationType.DiceToSolve,
      player: this.player,
      rotation: item.location.rotation
    }))
  }

  hasOtherDiceInSolveArea(face: DiceFace): boolean {
    return !!this
      .diceToSolve
      .rotation((r) => r !== face)
      .length
  }

  get diceToSolve() {
    return this
      .material(MaterialType.Dice)
      .location(LocationType.DiceToSolve)
      .player(this.player)
  }

  getDice(face: DiceFace) {
    return this
      .rolledDice
      .rotation((r) => r === face)
  }

  get rolledDice() {
    return this
      .material(MaterialType.Dice)
      .location(LocationType.PlayerRolledDice)
      .player(this.player)
  }
}