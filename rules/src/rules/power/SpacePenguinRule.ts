import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { EffectType } from '../effects/EffectType'
import { RuleId } from '../RuleId'
import { PowerRule } from './PowerRule'

export class SpacePenguinRule extends PowerRule {
  minPowerCost = 1

  onRuleStart() {
    return [this.startRule(RuleId.Effect)]
  }

  canUsePower(): boolean {
    return super.canUsePower() && this.countTokens < 2
  }

  onRuleEnd() {
    if (this.countTokens >= 2) return []
    this.pushEffect({
      effect: {
        type: EffectType.GetWhiteDiceToken,
        count: 1
      },
      sources: [{
        type: MaterialType.MonsterBoard,
        indexes: this.material(MaterialType.MonsterBoard).id(this.player).getIndexes()
      }],
      target: this.player
    })
    this.consumePower(1)
    return []
  }

  get countTokens() {
    return this
      .material(MaterialType.DiceToken)
      .location(LocationType.PlayerDiceToken)
      .player(this.player)
      .getQuantity()
  }
}