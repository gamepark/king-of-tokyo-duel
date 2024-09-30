import { MaterialMove } from '@gamepark/rules-api'
import { RuleId } from '../../RuleId'
import { KeepRule } from '../KeepRule'

export class MadeInALabKeepRule extends KeepRule {
  atStartOfTurn(): MaterialMove[] {
    if (this.getActivePlayer() !== this.cardPlayer) return []
    return [this.startRule(RuleId.MadeInALab)]
  }
}