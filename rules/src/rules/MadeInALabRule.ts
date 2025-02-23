import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialItem, MaterialMove, MoveKind, RuleMove } from '@gamepark/rules-api'
import { PowerCard } from '../material/cards/PowerCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BuyRule } from './BuyRule'
import { CustomMoveType } from './CustomMoveType'
import { MadeInALabKeepRule } from './keep/card/MadeInALabKeepRule'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class MadeInALabRule extends BuyRule {
  onRuleStart() {
    const moves = super.onRuleStart()

    if (new MadeInALabKeepRule(this.game, this.material(MaterialType.PowerCard).id(PowerCard.MadeInALab).getIndex()).isConsumed) {
      moves.push(this.getNextRule())
      this.memorize(Memory.Phase, RuleId.MadeInALab)
      return moves
    }
    this.memorize(Memory.Phase, RuleId.MadeInALab)
    return moves
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
    if (!isMoveItemType(MaterialType.PowerCard)(move)) return []
    if (move.location.type === LocationType.BuyArea) {
      new MadeInALabKeepRule(this.game, this.material(MaterialType.PowerCard).id(PowerCard.MadeInALab).getIndex()).markKeepCardConsumed()
    }

    const moves = super.afterItemMove(move)

    if (move.location.type === LocationType.BuyArea) {
      if (!moves.some(move => move.kind === MoveKind.RulesMove)) {
        moves.push(this.getNextRule())
      }
    }
    return moves
  }
}
