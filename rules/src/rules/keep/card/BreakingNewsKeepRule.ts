import { Pawn } from '../../../material/Pawn'
import { EffectType } from '../../effects/EffectType'
import { KeepRule } from '../KeepRule'

export class BreakingNewsKeepRule extends KeepRule {
  onBuyPowerCard() {
    if (this.getActivePlayer() !== this.cardPlayer) return
    this.pushEffect({
      type: EffectType.PullPawn,
      pawn: Pawn.Fame,
      count: 1
    }, this.player)
  }

  get player() {
    return this.game.rule!.player!
  }
}