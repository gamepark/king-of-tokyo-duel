import { MaterialMove } from '@gamepark/rules-api'
import { DiceFace } from '../../../material/DiceFace'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { Pawn } from '../../../material/Pawn'
import { KeepHelper } from '../../helper/KeepHelper'
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
    return this.rolledClawDice +
      new KeepHelper(this.game).bonusDiceFaces.filter((f) => f === DiceFace.Claw).length
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