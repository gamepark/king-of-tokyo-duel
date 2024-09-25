import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { energyCardCharacteristics } from '../../material/cards/EnergyCardCharacteristics'
import { MaterialType } from '../../material/MaterialType'
import { Monster } from '../../material/Monster'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'

export class EffectHelper extends MaterialRulesPart {
  constructor(game: MaterialGame, readonly player: Monster) {
    super(game);
  }

  applyEffectMoves() {
    const lastBought = this.lastBought
    if (!lastBought) return [];
    const effects = energyCardCharacteristics[lastBought.id].effects ?? []
    if (effects.length) {
      this.memorize(Memory.Effects, JSON.parse(JSON.stringify(effects)))
      return [this.startRule(RuleId.Effect)]
    }

    return []
  }

  get lastBought() {
    const lastBought = this.remind(Memory.BoughtCards)[0]
    if (lastBought) {
      return this.material(MaterialType.EnergyCard).getItem(lastBought)!
    }

    return

  }

}