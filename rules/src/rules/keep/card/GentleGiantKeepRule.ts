import sumBy from 'lodash/sumBy'
import { DiceFace } from '../../../material/DiceFace'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { Pawn } from '../../../material/Pawn'
import { EffectType } from '../../effects/EffectType'
import { KeepHelper } from '../../helper/KeepHelper'
import { KeepRule } from '../KeepRule'

export class GentleGiantKeepRule extends KeepRule {
  afterResolvingDice() {
    if (this.getActivePlayer() !== this.cardPlayer) return []
    const clawFaces = this.clawFaces
    if (!clawFaces) {
      this.pushEffect({
        type: EffectType.PullPawn,
        pawn: Pawn.Fame,
        count: 1,
      }, this.cardPlayer)
    }

    return []
  }

  get clawFaces() {
    return this.rolledClawDice +
      sumBy(new KeepHelper(this.game).getBonusFaces(DiceFace.Claw), (bonus) => bonus.count)
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