import { MaterialType } from '../material/MaterialType'
import { monsterBoardDescriptions } from '../material/MonsterBoardDescription'
import { BasePlayerTurnEffectRule } from './BasePlayerTurnEffectRule'
import { Heal } from './effects/EffectType'
import { KeepHelper } from './helper/KeepHelper'
import { RuleId } from './RuleId'

export class HealRule extends BasePlayerTurnEffectRule<Heal> {

  onRuleStart() {
    const heal = this.countHeal
    if (!heal) return [this.startRule(RuleId.Effect)]
    const item = this.wheel.getItem()!
    return [
      this.wheel.rotateItem(item.location.rotation + heal),
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
    const countHeal = newHealth - health
    if (newHealth === this.maxHealth) return countHeal
    return Math.min(this.maxHealth, newHealth + new KeepHelper(this.game).onHeal())
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