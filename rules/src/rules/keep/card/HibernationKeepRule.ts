import { MaterialMove } from '@gamepark/rules-api'
import { RuleId } from '../../RuleId'
import { KeepRule } from '../KeepRule'

export class HibernationKeepRule extends KeepRule {
  immune() {
    if (this.getActivePlayer() !== this.cardPlayer) return true
    return true
  }

  atStartOfTurn(): MaterialMove[] {
    if (this.getActivePlayer() !== this.cardPlayer) return []
    return [this.startRule(RuleId.Hibernation)]
  }
}