import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove } from '@gamepark/rules-api'
import { PowerCard } from '../material/cards/PowerCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnEffectRule } from './BasePlayerTurnEffectRule'
import { CustomMoveType } from './CustomMoveType'
import { EffectType } from './effects/EffectType'
import { HealHelper } from './helper/HealHelper'
import { isChangingRule } from './IsChangingRule'
import { RuleId } from './RuleId'

export class HibernationRule extends BasePlayerTurnEffectRule {
  getPlayerMoves() {
    const moves = super.getPlayerMoves()
    moves.push(
      this.hibernation.moveItem({
        type: LocationType.Discard
      })
    )

    moves.push(this.customMove(CustomMoveType.Ignore))
    return moves
  }

  onCustomMove(move: CustomMove) {
    if (!isCustomMoveType(CustomMoveType.Ignore)(move)) return []
    const healCount = new HealHelper(this.game, this.player).heal(6)
    if (healCount) {
      this.pushEffect({
        effect: {
          type: EffectType.Heal,
          count: healCount
        },
        sources: [{
          type: MaterialType.PowerCard,
          indexes: [this.hibernation.getIndex()]
        }],
        target: this.player
      })
    }

    if (this.effects.length) {
      return [this.startRule(RuleId.Effect)]
    }
    return [this.startRule(RuleId.ChangePlayer)]
  }

  afterItemMove(move: ItemMove) {
    const moves = super.afterItemMove(move)
    if (moves.some(isChangingRule)) return moves
    if (!isMoveItemType(MaterialType.PowerCard)(move) || move.location.type !== LocationType.Discard) return moves
    moves.push(this.startRule(RuleId.RollDice))
    return moves
  }

  get hibernation() {
    return this
      .material(MaterialType.PowerCard)
      .id(PowerCard.Hibernation)

  }
}