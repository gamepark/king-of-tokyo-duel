import { MaterialType } from '../material/MaterialType'
import { monsterBoardDescriptions } from '../material/MonsterBoardDescription'
import { BasePlayerTurnEffectRule } from './BasePlayerTurnEffectRule'
import { Heal } from './effects/EffectType'
import { RuleId } from './RuleId'

export class HealRule extends BasePlayerTurnEffectRule<Heal> {

  onRuleStart() {
    const heal = this.countHeal
    if (!heal) return [this.startRule(RuleId.Effect)]
    return [
      this.wheel.rotateItem((item) => Math.min(item.location.rotation + this.currentEffect.effect.count, this.maxHealth)),
      this.startRule(RuleId.Effect)
    ]
  }

  get wheel() {
    return this
      .material(MaterialType.HealthCounter)
      .player(this.currentEffect.target)
  }

  get countHeal() {
    const healthWheel = this.healthWheel
    const healCount = this.currentEffect.effect.count
    const health = healthWheel.getItem()!.location.rotation
    const newHealth = Math.min(this.maxHealth, health + healCount)
    if (newHealth === health) return 0
    return newHealth
  }

  get healthWheel() {
    return this
      .material(MaterialType.HealthCounter)
      .player(this.currentEffect.target)
  }

  get maxHealth() {
    return monsterBoardDescriptions[this.currentEffect.target]!.health
  }
}