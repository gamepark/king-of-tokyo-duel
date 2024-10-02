import { MaterialMove } from '@gamepark/rules-api'
import { RuleId } from '../../RuleId'
import { KeepRule } from '../KeepRule'

export class InShapeKeepRule extends KeepRule {
  atEndOfTurn(): MaterialMove[] {
    if (this.getActivePlayer() === this.cardPlayer) return []
    return [this.startPlayerTurn(RuleId.InShape, this.rival)]
  }
}