import { MaterialType } from '../../material/MaterialType'
import { EffectType } from '../effects/EffectType'
import { RuleId } from '../RuleId'
import { PowerRule } from './PowerRule'

export class CyberKittyRule extends PowerRule {
  onRuleStart() {
    const power = this.remainingPower
    this.pushEffect({
      effect: {
        type: EffectType.GainEnergy,
        count: Math.floor(power / 3) * 3 + (power % 3 === 2 ? 1 : 0)
      },
      sources: [{
        type: MaterialType.MonsterBoard,
        indexes: this.material(MaterialType.MonsterBoard).id(this.player).getIndexes()
      }],
      target: this.player
    })
    this.consumePower(power)
    return [this.startRule(RuleId.Effect)]
  }
}