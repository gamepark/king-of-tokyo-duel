import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { DiceFace } from '../material/DiceFace'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Pawn } from '../material/Pawn'
import { PullPawnHelper } from './helper/PullPawnHelper'
import { isChangingRule } from './IsChangingRule'
import { RuleId } from './RuleId'

export class PullPawnRule extends PlayerTurnRule {
  onRuleStart() {
    const moves: MaterialMove[] = []
    const helper = new PullPawnHelper(this.game, this.player)
    const fameDice = this.fameDice
    moves.push(...helper.doPull(Pawn.Fame,  fameDice >= 3? (fameDice % 3 + 1): 0))
    if (moves.some(isChangingRule)) {
      return moves
    }

    const destructionDice = this.destructionDice
    moves.push(...helper.doPull(Pawn.Destruction, destructionDice >= 3? (destructionDice % 3 + 1): 0))
    if (moves.some(isChangingRule)) {
      return moves
    }

    moves.push(this.startRule(RuleId.AfterDiceResolution))
    return moves
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