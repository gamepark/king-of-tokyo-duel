import { MaterialMove } from '@gamepark/rules-api'
import { Monster } from '../../../material/Monster'
import { RuleId } from '../../RuleId'
import { KeepRule } from '../KeepRule'


export class UnstableDnaKeepRule extends KeepRule {
  afterSmashTakenComputed(player: Monster , source: number): MaterialMove[] {
    if (player !== this.cardPlayer) return []
    // Here, we explicitely called
    // TODO: per attack or cummulative ?
    if (source < 3) return []
    return [this.startRule(RuleId.UnstableDna)]
  }
}