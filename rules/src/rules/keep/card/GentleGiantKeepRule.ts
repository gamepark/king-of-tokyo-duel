import { MaterialMove } from '@gamepark/rules-api'
import { DiceFace } from '../../../material/DiceFace'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { Pawn } from '../../../material/Pawn'
import { PullPawnHelper } from '../../helper/PullPawnHelper'
import { KeepRule } from '../KeepRule'

export class GentleGiantKeepRule extends KeepRule {
  afterRollingDice(): MaterialMove[] {
    if (this.getActivePlayer() !== this.cardPlayer) return []
    const clawFaces = this.clawFaces
    if (!clawFaces) {
      return new PullPawnHelper(this.game, this.player).pull(Pawn.Fame, 1)
    }

    return []
  }

  get clawFaces() {
      // TODO: count additional faces from keep effect ? +
    return this.rolledClawDice
  }

  get rolledClawDice() {
    return this
      .material(MaterialType.Dice)
      .location(LocationType.PlayerRolledDice)
      .player(this.player)
      .rotation(DiceFace.Claw)
      .length
  }

  get player() {
    return this.game.rule!.player!
  }
}