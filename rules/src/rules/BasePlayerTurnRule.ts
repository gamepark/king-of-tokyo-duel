import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, PlayerTurnRule, RuleMove } from '@gamepark/rules-api'
import { DiceFace } from '../material/DiceFace'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { KeepHelper } from './helper/KeepHelper'
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

    return []
  }

  beforeItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.Pawn)(move)) {
      const item = this.material(MaterialType.Pawn).getItem(move.itemIndex)
      if (item.location.x! > move.location.x! || item.location.y! > move.location.y!) {
        // FIXME: compute moves distances
        const count = (item.location.y! - move.location.y!) + (item.location.x! - move.location.x!)
        if (count === 0) return []
        return new KeepHelper(this.game).afterPullPawn(item.id, count)
      }
    }

    return []
  }

  isAlreadyConsumed(face: DiceFace) {
    return (this.remind(Memory.DiceFacesSolved) ?? []).includes(face)
  }
}