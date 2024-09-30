import { MaterialMove } from '@gamepark/rules-api'
import { RuleId } from '../../RuleId'
import { KeepRule } from '../KeepRule'

export class HibernationKeepRule extends KeepRule {
  ignoredSmash() {
    if (this.getActivePlayer() !== this.cardPlayer) return 0
    return Infinity
  }

  atStartOfTurn(): MaterialMove[] {
    if (this.getActivePlayer() !== this.cardPlayer) return []
    return [this.startRule(RuleId.Hibernation)]
  }
}