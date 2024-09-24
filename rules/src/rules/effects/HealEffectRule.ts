import { MaterialType } from '../../material/MaterialType'
import { monsterBoardDescriptions } from '../../material/MonsterBoardDescription'
import { AbstractEffectRule } from './AbstractEffectRule'
import { Heal } from './EffectType'

export class HealEffectRule extends AbstractEffectRule<Heal> {
  getMoves() {
    const healthWheel = this.healthWheel
    const health = healthWheel.getItem()!.location.rotation
    const newHealth = Math.min(this.maxHealth, health + this.effect.count)
    if (newHealth === health) return []
    return healthWheel.rotateItems(newHealth)
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