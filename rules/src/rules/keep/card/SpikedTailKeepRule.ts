import { Pawn } from '../../../material/Pawn'
import { EffectType } from '../../effects/EffectType'
import { KeepRule } from '../KeepRule'


export class SpikedTailKeepRule extends KeepRule {
  afterPullPawn(pawn: Pawn, count: number) {
    if (this.getActivePlayer() !== this.cardPlayer || pawn !== Pawn.Destruction) return
    this.pushEffect({
      type: EffectType.Smash,
      count: count
    }, this.rival)
  }
}