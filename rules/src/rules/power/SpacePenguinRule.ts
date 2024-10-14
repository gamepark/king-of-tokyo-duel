import { MaterialType } from '../../material/MaterialType'
import { EffectType } from '../effects/EffectType'
import { RuleId } from '../RuleId'
import { PowerRule } from './PowerRule'

export class SpacePenguinRule extends PowerRule {
  onRuleStart() {
    if (!this.remainingPower) return []
    return [this.startRule(RuleId.Effect)]
  }

  onRuleEnd() {
    this.pushEffect({
      effect: {
        type: EffectType.GetWhiteDiceToken,
        count: 1
      },
      sources: [{
        type: MaterialType.MonsterBoard,
        indexes: [this.material(MaterialType.MonsterBoard).id(this.player).getIndex()]
      }],
      target: this.player
    })
    this.consumePower(1)
    return []
  }
}