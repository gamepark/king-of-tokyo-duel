import { DiceFace } from '../material/DiceFace'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { monsterBoardDescriptions } from '../material/MonsterBoardDescription'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { KeepHelper } from './helper/KeepHelper'
import { RuleId } from './RuleId'

export class HealRule extends BasePlayerTurnRule {

  onRuleStart() {
    const healthWheel = this.healthWheel
    const healCount = this.countHeal
    const health = healthWheel.getItem()!.location.rotation
    const newHealth = Math.min(this.maxHealth, health + healCount)
    return [
      healthWheel.rotateItem(newHealth),
      this.startRule(RuleId.Smash)
    ]
  }

  get countHeal() {
    const healthWheel = this.healthWheel
    const healCount = this.healDice + new KeepHelper(this.game).bonusDiceFaces.filter((f) => f === DiceFace.Heal).length
    const health = healthWheel.getItem()!.location.rotation
    const newHealth = Math.min(this.maxHealth, health + healCount)
    if (newHealth === health) return 0
    return newHealth
  }

  get healthWheel() {
    return this
      .material(MaterialType.HealthCounter)
      .player(this.player)
  }

  get maxHealth() {
    return monsterBoardDescriptions[this.player]!.health
  }

  get healDice() {
    return this
      .dice
      .rotation(DiceFace.Heal)
      .length
  }

  get dice() {
    return this
      .material(MaterialType.Dice)
      .location(LocationType.PlayerRolledDice)
      .player(this.player)
  }
}