import { MaterialType } from '../../material/MaterialType'
import { monsterBoardDescriptions } from '../../material/MonsterBoardDescription'
import { BasePlayerTurnEffectRule } from '../BasePlayerTurnEffectRule'
import { RuleId } from '../RuleId'
import { Heal } from './EffectType'

export class HealEffectRule extends BasePlayerTurnEffectRule<Heal> {
  onRuleStart() {
    const healthWheel = this.healthWheel
    const health = healthWheel.getItem()!.location.rotation
    const count = this.currentEffect.effect.count
    const newHealth = Math.min(this.maxHealth, health + count)
    if (newHealth === health) return []
    return [
      ...healthWheel.rotateItems(newHealth),
      this.startRule(RuleId.Effect)
    ]
  }

  get maxHealth() {
    return monsterBoardDescriptions[this.player]!.health
  }

  get healthWheel() {
    return this
      .material(MaterialType.HealthCounter)
      .player(this.player)
  }
}