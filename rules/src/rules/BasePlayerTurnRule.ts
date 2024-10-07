import { CustomMove, isCustomMoveType, PlayerTurnRule, RuleMove } from '@gamepark/rules-api'
import { DiceFace } from '../material/DiceFace'
import { CustomMoveType } from './CustomMoveType'
import { PullPawnHelper } from './helper/PullPawnHelper'
import { SmashHelper } from './helper/SmashHelper'
import { Memory } from './Memory'

export class BasePlayerTurnRule extends PlayerTurnRule {
  getNextRule?(): RuleMove

  get rival() {
    return this.game.players.find((p) => p !== this.player)!
  }

  onCustomMove(move: CustomMove) {
    if (isCustomMoveType(CustomMoveType.Smash)(move)) {
      return new SmashHelper(this.game, move.data.player).onSmash(move.data.damages)
    }
    if (isCustomMoveType(CustomMoveType.PullPawn)(move)) {
      return [
        ...new PullPawnHelper(this.game, move.data.player).onPullPawn(move.data.pawn, move.data.count)
      ]
    }

    return []
  }

  isAlreadyConsumed(face: DiceFace) {
    return (this.remind(Memory.DiceFacesSolved) ?? []).includes(face)
  }
}