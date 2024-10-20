import { CustomMove, isCustomMoveType, isDeleteItemType, ItemMove } from '@gamepark/rules-api'
import { PowerCard } from '../material/cards/PowerCard'
import { MaterialType } from '../material/MaterialType'
import { Pawn } from '../material/Pawn'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { CustomMoveType } from './CustomMoveType'
import { EffectType, InShape } from './effects/EffectType'
import { RuleId } from './RuleId'

export class InShapeRule extends BasePlayerTurnRule<InShape> {
  onRuleStart() {
    const energy = this.energy
    if (!energy.length) return [this.startRule(RuleId.Effect)]
    return []
  }

  getPlayerMoves() {
    return [
      this.energy.deleteItem(1),
      this.customMove(CustomMoveType.Pass)
    ]
  }

  onCustomMove(move: CustomMove) {
    return isCustomMoveType(CustomMoveType.Pass)(move) ? [this.startRule(RuleId.Effect)] : []
  }

  afterItemMove(move: ItemMove) {
    if (isDeleteItemType(MaterialType.Energy)(move)) {
      const currentEffect = this.currentEffect
      if (currentEffect.effect.count > 1) {
        currentEffect.effect.count--
        this.unshiftEffect(currentEffect)
      }
      this.unshiftEffect({
        effect: {
          type: EffectType.PullPawn,
          pawn: Pawn.Fame,
          count: 1
        },
        sources: [{
          type: MaterialType.PowerCard,
          indexes: this.material(MaterialType.PowerCard).id(PowerCard.InShape).getIndexes(),
          count: 1
        }],
        target: this.player
      })

      return [this.startRule(RuleId.Effect)]
    }
    return []
  }

  get energy() {
    return this
      .material(MaterialType.Energy)
      .player(this.player)
  }
}