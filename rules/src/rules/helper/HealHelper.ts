import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { DiceFace } from '../../material/DiceFace'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Monster } from '../../material/Monster'
import { monsterBoardDescriptions } from '../../material/MonsterBoardDescription'

export class HealHelper extends MaterialRulesPart {

  constructor(game: MaterialGame, readonly player: Monster) {
    super(game);
  }

  heal(count: number) {
    const healthWheel = this.healthWheel
    const health = healthWheel.getItem()!.location.rotation
    const newHealth = Math.min(this.maxHealth, health + count)
    if (newHealth === health) return 0
    return newHealth - health
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