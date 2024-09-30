import { MaterialMove } from '@gamepark/rules-api'
import { Monster } from '../../../material/Monster'
import { DamageSource } from '../../helper/DamageSource'
import { RuleId } from '../../RuleId'
import { KeepRule } from '../KeepRule'


export class UnstableDnaKeepRule extends KeepRule {
  afterSmashTakenComputed(player: Monster , source: DamageSource): MaterialMove[] {
    if (player !== this.cardPlayer) return []
    // Here, we explicitely called
    // TODO: per attack or cummulative ?
    if (source.damages < 3) return []
    return [this.startRule(RuleId.UnstableDna)]
  }
}