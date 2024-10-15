import { Pawn } from '../../../material/Pawn'
import { EffectType } from '../../effects/EffectType'
import { KeepRule } from '../KeepRule'


export class SpikedTailKeepRule extends KeepRule {
  afterPullPawn(pawn: Pawn) {
    if (this.getActivePlayer() !== this.cardPlayer || pawn !== Pawn.Destruction) return
    // TODO: search for existing Spiked tail effect in the memory to increase count instead of creating a new one
    this.pushEffect({
      type: EffectType.Smash,
      count: 1
    }, this.rival)
  }
}