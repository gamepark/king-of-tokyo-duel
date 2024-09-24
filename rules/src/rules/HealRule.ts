import { PlayerTurnRule } from '@gamepark/rules-api'
import { DiceFace } from '../material/DiceFace'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { monsterBoardDescriptions } from '../material/MonsterBoardDescription'
import { RuleId } from './RuleId'

export class HealRule extends PlayerTurnRule {

  onRuleStart() {
    const healthWheel = this.healthWheel
    const healCount = this.healDice
    const health = healthWheel.getItem()!.location.rotation
    const newHealth = Math.min(this.maxHealth, health + healCount)
    if (newHealth === health) return [this.startRule(RuleId.Smash)]
    return [
      healthWheel.rotateItem(newHealth),
      this.startRule(RuleId.Smash)
    ]
  }

  get healthWheel() {
    return this
      .material(MaterialType.HealthCounter)
      .player(this.player)
  }

  get maxHealth() {
    return monsterBoardDescriptions[this.player]!.health
  }

  get dice() {
    return this
      .material(MaterialType.Dice)
      .location(LocationType.PlayerRolledDice)
      .player(this.player)
  }

  get healDice() {
    return this
      .dice
      .rotation(DiceFace.Heart)
      .length
  }
}