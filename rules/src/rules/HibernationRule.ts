import { isMoveItemType, ItemMove } from '@gamepark/rules-api'
import { PowerCard } from '../material/cards/PowerCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { CustomMoveType } from './CustomMoveType'
import { HealHelper } from './helper/HealHelper'
import { RuleId } from './RuleId'

export class HibernationRule extends BasePlayerTurnRule {
  getPlayerMoves() {
    return [
      this.hibernation.moveItem({
        type: LocationType.Discard
      }),
      this.customMove(CustomMoveType.Ignore)
    ]
  }

  onCustomMove() {
    return [
      ...new HealHelper(this.game, this.player).heal(6),
      this.startRule(RuleId.ChangePlayer)
    ]
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.PowerCard)(move) || move.location.type !== LocationType.Discard) return []
    return [
      this.startRule(RuleId.RollDice)
    ]
  }

  get hibernation() {
    return this
      .material(MaterialType.PowerCard)
      .id(PowerCard.Hibernation)

  }
}