import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialItem, MaterialMove, RuleMove } from '@gamepark/rules-api'
import { PowerCard } from '../material/cards/PowerCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BuyRule } from './BuyRule'
import { CustomMoveType } from './CustomMoveType'
import { MadeInALabKeepRule } from './keep/card/MadeInALabKeepRule'
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
    return Math.max(super.getCost(item) - 1, 1)
  }

  onCustomMove(move: CustomMove) {
    if (!isCustomMoveType(CustomMoveType.Pass)(move)) return []
    new MadeInALabKeepRule(this.game, this.material(MaterialType.PowerCard).id(PowerCard.MadeInALab).getIndex()).markKeepCardConsumed()
    return [this.getNextRule()]
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.PowerCard)(move) && move.location.type === LocationType.BuyArea) {
      new MadeInALabKeepRule(this.game, this.material(MaterialType.PowerCard).id(PowerCard.MadeInALab).getIndex()).markKeepCardConsumed()
    }
    return super.afterItemMove(move).concat(this.getNextRule())
  }
}