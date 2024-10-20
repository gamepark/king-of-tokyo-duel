import { Monster } from '../../../material/Monster'
import { EffectType, InShape } from '../../effects/EffectType'
import { Memory } from '../../Memory'
import { KeepRule } from '../KeepRule'

export class InShapeKeepRule extends KeepRule {
  afterSmashTakenComputed(target: Monster, takenDamages: number) {
    if (target === this.cardPlayer) return
    if (this.rivalDamages <= 3) return
    const existingEffect = this.effects.find(e => e.effect.type === EffectType.InShape)
    if (existingEffect) {
      (existingEffect.effect as InShape).count += Math.min(this.rivalDamages - 3, takenDamages)
    } else {
      this.unshiftEffect({
        type: EffectType.InShape,
        count: Math.min(this.rivalDamages - 3, takenDamages)
      }, this.cardPlayer)
    }
  }

  get rivalDamages() {
    return this.remind(Memory.RivalSmashCount) ?? 0
  }
}