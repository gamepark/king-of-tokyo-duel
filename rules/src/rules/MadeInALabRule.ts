import { CustomMove, isCustomMoveType, MaterialItem, MaterialMove, RuleMove } from '@gamepark/rules-api'
import { powerCardCharacteristics } from '../material/cards/PowerCardCharacteristics'
import { BuyRule } from './BuyRule'
import { CustomMoveType } from './CustomMoveType'
import { KeepHelper } from './helper/KeepHelper'
import { RuleId } from './RuleId'

export class MadeInALabRule extends BuyRule {
  onRuleStart() {
    return []
  }

  getNextRule(): RuleMove {
    if (this.effects.length) {
      return this.startRule(RuleId.Effect)
    }

    return this.startRule(RuleId.OnStartTurn)
  }

  getCost(item: MaterialItem) {
    if (item.location.x! === 0) return Math.max(1, powerCardCharacteristics[item.id].cost - 2)
    return Math.max(1, powerCardCharacteristics[item.id].cost - 1)
  }

  onCustomMove(move: CustomMove) {
    const moves: MaterialMove[] = []
    new KeepHelper(this.game).onCustomMove(move)
    if (!isCustomMoveType(CustomMoveType.Pass)(move)) return moves
    moves.push(this.getNextRule())
    return moves
  }
}