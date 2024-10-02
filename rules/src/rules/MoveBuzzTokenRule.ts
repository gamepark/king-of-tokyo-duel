import { RuleMove } from '@gamepark/rules-api'
import { powerCardCharacteristics } from '../material/cards/PowerCardCharacteristics'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { Effect } from './effects/EffectType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class MoveBuzzTokenRule extends BasePlayerTurnRule {
  onRuleStart() {
    // TODO: don't go to the buy rule immediately, but allow the player :
    // 1. Place the token if it is not already placed
    // 2. Move the token if it is already on board
    return [this.getNextRule()]
  }

  getNextRule(): RuleMove {
    if (this.effects.length) {
      return this.startRule(RuleId.Effect)
    }

    return this.startRule(RuleId.ChangePlayer)
  }

  get effects() {
    return this.remind<Effect[]>(Memory.Effects) ?? []
  }

  get buzz() {
    const bougthCards = this.remind(Memory.BoughtCards) ?? []
    const card = bougthCards[bougthCards.length - 1]
    if (card === undefined) {
      console.error("If we are in move token rule, a bought card MUST be present")
    }

    const item = this.material(MaterialType.PowerCard).getItem(card)!
    const buzz = powerCardCharacteristics[item.id].buzz
    if (buzz === undefined) {
      console.error("The last bought card has NO buzz token")
    }

    return buzz
  }

  onRuleEnd() {
    return []
  }
}