import { DiceFace } from '../../material/DiceFace'
import { MaterialType } from '../../material/MaterialType'
import { Smash } from '../effects/EffectType'
import { EffectWithSource } from '../effects/EffectWithSource'
import { ResolveDiceRule } from '../ResolveDiceRule'
import { RuleId } from '../RuleId'
import { PowerRule } from './PowerRule'

export class MekaDragonRule extends PowerRule {
  canUsePower(): boolean {
    return new ResolveDiceRule(this.game).canSmash()
  }

  onRuleStart() {
    const resolveDiceRule = new ResolveDiceRule(this.game)
    const power = this.remainingPower
    const effect = resolveDiceRule.getEffect(DiceFace.Claw) as EffectWithSource<Smash>
    if (power > 1) {
      effect.sources.push({
        type: MaterialType.MonsterBoard,
        indexes: this.material(MaterialType.MonsterBoard).id(this.player).getIndexes(),
        count: effect.effect.count * power - effect.effect.count
      })
    }
    effect.effect.count *= power
    this.pushEffect(effect)
    this.consumePower(power)
    resolveDiceRule.consumeFaces(DiceFace.Claw)
    return [this.startRule(RuleId.Effect)]
  }
}