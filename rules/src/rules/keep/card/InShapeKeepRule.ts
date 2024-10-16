import { Monster } from '../../../material/Monster'
import { EffectType } from '../../effects/EffectType'
import { EffectWithSource } from '../../effects/EffectWithSource'
import { Memory } from '../../Memory'
import { KeepRule } from '../KeepRule'

export class InShapeKeepRule extends KeepRule {
  afterSmashTakenComputed(target: Monster, takenDamages: number) {
    if (this.getActivePlayer() === this.cardPlayer) return
    if (target === this.cardPlayer) return
    if (this.rivalDamages <= 3) return
    const inShapeEffect = this.inShapeEffect
    if (inShapeEffect) {
      inShapeEffect.effect.count += takenDamages
    } else {
      this.pushEffect({
        type: EffectType.InShape,
        count: takenDamages
      }, this.cardPlayer)
    }
  }

  get inShapeEffect() {
    return this.effects.find((e) => e.effect.type === EffectType.InShape)
  }

  get rivalDamages() {
    return this.remind(Memory.RivalSmashCount) ?? 0
  }

  get effects() {
    return this.remind<EffectWithSource[]>(Memory.Effects) ?? []
  }
}