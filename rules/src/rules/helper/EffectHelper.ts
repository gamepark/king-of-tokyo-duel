import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { powerCardCharacteristics } from '../../material/cards/PowerCardCharacteristics'
import { MaterialType } from '../../material/MaterialType'
import { Monster } from '../../material/Monster'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'

export class EffectHelper extends MaterialRulesPart {
  constructor(game: MaterialGame, readonly player: Monster) {
    super(game);
  }

  applyEffectMoves() {
    const lastCard = this.lastCard
    if (!lastCard) return [];
    const effects = powerCardCharacteristics[lastCard.id].effects ?? []

    if (effects.length) {

      this.memorize(Memory.Effects, JSON.parse(JSON.stringify(effects)))
      return [this.startRule(RuleId.Effect)]
    }

    return []
  }

  get lastCard() {
    const lastBoughtCards = this.remind(Memory.BoughtCards) ?? []
    if (lastBoughtCards.length) {
      return this.material(MaterialType.PowerCard).getItem(lastBoughtCards[lastBoughtCards.length - 1])!
    }

    return

  }

}