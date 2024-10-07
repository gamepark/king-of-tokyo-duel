import { MaterialMove } from '@gamepark/rules-api'
import { DiceFace } from '../material/DiceFace'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Pawn } from '../material/Pawn'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { KeepHelper } from './helper/KeepHelper'
import { PullPawnHelper } from './helper/PullPawnHelper'
import { isChangingRule } from './IsChangingRule'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class PullFamePawnRule extends BasePlayerTurnRule {
  onRuleStart() {
    const moves: MaterialMove[] = []
    const helper = new PullPawnHelper(this.game, this.player)
    moves.push(...helper.pull(Pawn.Fame,  this.countMoves))
    if (moves.some(isChangingRule)) return moves

    moves.push(this.startRule(RuleId.ResolveDice))
    return moves
  }

  get fameDice() {
    return this.dice
      .rotation(DiceFace.Fame)
      .length
  }

  get dice() {
    return this
      .material(MaterialType.Dice)
      .location(LocationType.PlayerRolledDice)
      .player(this.player)
  }

  get countMoves() {
    const fameDice = this.fameDice +
      new KeepHelper(this.game).bonusDiceFaces.filter((f) => f === DiceFace.Fame).length
    return fameDice >= 3? (fameDice % 3 + 1): 0
  }

  onRuleEnd() {
    this.memorize(Memory.DiceFacesSolved, (faces: DiceFace[] = []) => {
      faces.push(DiceFace.Fame)
      return faces
    })
    return []
  }
}