import { diceFaces } from '../../../material/DiceFace'
import { Pawn } from '../../../material/Pawn'
import { EffectType } from '../../effects/EffectType'
import { RollHelper } from '../../helper/RollHelper'
import { KeepRule } from '../KeepRule'

export class AntimatterPelletsKeepRule extends KeepRule {
  afterRollingDice() {
    if (this.getActivePlayer() !== this.cardPlayer) return
    const rollHelper = new RollHelper(this.game, this.cardPlayer)
    if (diceFaces.some(face => rollHelper.countFace(face) >= 5)) {
      this.pushEffect({
        type: EffectType.Smash,
        count: 4
      }, this.rival)

      this.pushEffect({
        type: EffectType.PullPawn,
        pawn: Pawn.Destruction,
        count: 2
      }, this.cardPlayer)
    }
  }

  get rival() {
    return this.game.players.find((p) => p !== this.getActivePlayer())!
  }
}