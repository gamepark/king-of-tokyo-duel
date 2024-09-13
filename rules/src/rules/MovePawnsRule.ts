import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { DiceFace } from '../material/DiceFace'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Pawn } from '../material/Pawn'
import { RuleId } from './RuleId'

export class MovePawnsRule extends PlayerTurnRule {
  onRuleStart() {
    const fameDice = this.fameDice
    const destructionDice = this.destructionDice
    const moves: MaterialMove[] = []
    const isLeft = this.game.players[0] === this.player

    if (fameDice) {
      if (isLeft) {
        moves.push(this.fameToken.moveItem((item) => ({ ...item.location, x: Math.max(0, item.location.x! - fameDice)})))
      } else {
        moves.push(this.fameToken.moveItem((item) => ({ ...item.location, x: Math.min(0, item.location.x! + fameDice)})))
      }
    }

    if (destructionDice) {
      if (isLeft) {
        moves.push(this.destructionToken.moveItem((item) => ({ ...item.location, x: Math.max(0, item.location.x! - destructionDice)})))
      } else {
        moves.push(this.destructionToken.moveItem((item) => ({ ...item.location, x: Math.min(0, item.location.x! + destructionDice)})))
      }
    }

    moves.push(this.startRule(RuleId.Buy))

    return moves
  }

  get fameToken() {
    return this.material(MaterialType.Pawn).id(Pawn.Fame)
  }

  get destructionToken() {
    return this.material(MaterialType.Pawn).id(Pawn.Fame)
  }

  get fameDice() {
    return this.dice
      .rotation(DiceFace.Star)
      .length
  }

  get destructionDice() {
    return this.dice
      .rotation(DiceFace.Destruction)
      .length
  }

  get dice() {
    return this
      .material(MaterialType.Dice)
      .location(LocationType.PlayerRolledDice)
      .player(this.player)
  }
}