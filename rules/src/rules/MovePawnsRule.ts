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
    const fameCount = fameDice > 3? (fameDice % 3 + 1): 0
    const destructionCount = destructionDice > 3? (destructionDice % 3 + 1): 0
    if (fameCount) {
      if (isLeft) {
        moves.push(this.fameToken.moveItem((item) => ({ ...item.location, x: Math.max(0, item.location.x! - (fameCount * 2))})))
      } else {
        moves.push(this.fameToken.moveItem((item) => ({ ...item.location, x: Math.min(0, item.location.x! + (fameCount * 2))})))
      }
    }

    if (destructionCount) {
      if (isLeft) {
        moves.push(this.destructionToken.moveItem((item) => ({ ...item.location, x: Math.max(0, item.location.x! - (destructionCount * 2))})))
      } else {
        moves.push(this.destructionToken.moveItem((item) => ({ ...item.location, x: Math.min(0, item.location.x! + (destructionCount * 2))})))
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