import { MaterialMove } from '@gamepark/rules-api'
import { RuleId } from '../../RuleId'
import { KeepRule } from '../KeepRule'

export class RebootingKeepRule extends KeepRule {
  afterRollingDice(): MaterialMove[] {
    return [this.startRule(RuleId.Rebooting)]
  }
}