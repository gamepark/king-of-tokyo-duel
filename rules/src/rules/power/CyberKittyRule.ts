import { MaterialType } from '../../material/MaterialType'
import { EffectType } from '../effects/EffectType'
import { RuleId } from '../RuleId'
import { PowerRule } from './PowerRule'

export class CyberKittyRule extends PowerRule {
  onRuleStart() {
    const power = this.remainingPower
    const count = Math.floor(power / 3) * 4 + (power % 3 === 2 ? 2 : 0)
    this.pushEffect({
      effect: {
        type: EffectType.GainEnergy,
        count: count
      },
      sources: [{
        type: MaterialType.MonsterBoard,
        indexes: this.material(MaterialType.MonsterBoard).id(this.player).getIndexes(),
        count: count
      }],
      target: this.player
    })
    this.consumePower(power)
    return [this.startRule(RuleId.Effect)]
  }
}