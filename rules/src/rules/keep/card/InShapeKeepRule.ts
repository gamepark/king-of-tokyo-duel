import { Monster } from '../../../material/Monster'
import { EffectType } from '../../effects/EffectType'
import { Memory } from '../../Memory'
import { KeepRule } from '../KeepRule'

export class InShapeKeepRule extends KeepRule {
  afterSmashTakenComputed(target: Monster, takenDamages: number) {
    if (this.getActivePlayer() === this.cardPlayer) return
    if (target === this.cardPlayer) return
    if (this.rivalDamages <= 3) return
    this.unshiftEffect({
      type: EffectType.InShape,
      count: Math.min(this.rivalDamages - 3, takenDamages)
    }, this.cardPlayer)
  }

  get rivalDamages() {
    return this.remind(Memory.RivalSmashCount) ?? 0
  }
}