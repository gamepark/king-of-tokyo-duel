import { RuleMove } from '@gamepark/rules-api'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { RuleId } from './RuleId'

export class InShapeRule extends BasePlayerTurnRule {

  // TODO: do effect and go to CHange Player of other player
  getNextRule(): RuleMove {
    return this.startPlayerTurn(RuleId.ChangePlayer, this.rival)
  }

}