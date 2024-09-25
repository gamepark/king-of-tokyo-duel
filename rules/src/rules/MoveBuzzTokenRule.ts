import { PlayerTurnRule } from '@gamepark/rules-api'
import { energyCardCharacteristics } from '../material/cards/EnergyCardCharacteristics'
import { MaterialType } from '../material/MaterialType'
import { EffectHelper } from './helper/EffectHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class MoveBuzzTokenRule extends PlayerTurnRule {
  onRuleStart() {
    // TODO: don't go to the buy rule immediately, but allow the player :
    // 1. Place the token if it is not already placed
    // 2. Move the token if it is already on board

    const effectMoves = new EffectHelper(this.game, this.player).applyEffectMoves()
    if (effectMoves.length) return effectMoves
    return [this.startRule(RuleId.Buy)]
  }

  get buzz() {
    const bougthCards = this.remind(Memory.BoughtCards) ?? []
    const card = bougthCards[bougthCards.length - 1]
    if (card === undefined) {
      console.error("If we are in move token rule, a bought card MUST be present")
    }

    const item = this.material(MaterialType.EnergyCard).getItem(card)!
    const buzz = energyCardCharacteristics[item.id].buzz
    if (buzz === undefined) {
      console.error("The last bought card has NO buzz token")
    }

    return buzz
  }

  onRuleEnd() {
    return []
  }
}