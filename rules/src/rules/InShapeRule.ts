import { CustomMove, isCustomMoveType } from '@gamepark/rules-api'
import { MaterialMove } from '@gamepark/rules-api/dist/material/moves/MaterialMove'
import { PowerCard } from '../material/cards/PowerCard'
import { MaterialType } from '../material/MaterialType'
import { Pawn } from '../material/Pawn'
import { BasePlayerTurnEffectRule } from './BasePlayerTurnEffectRule'
import { CustomMoveType } from './CustomMoveType'
import { EffectType, InShape } from './effects/EffectType'
import { RuleId } from './RuleId'

export class InShapeRule extends BasePlayerTurnEffectRule<InShape> {
  onRuleStart() {
    const energy = this.energy
    if (!energy.length) return [this.startRule(RuleId.Effect)]
    return []
  }

  getPlayerMoves() {
    const moves: MaterialMove[] = []
    const inShape = this.inShapeEffect!
    for (let i = 1; i <= inShape.effect.count; i++) {
      moves.push(this.customMove(CustomMoveType.Pull, i))
    }

    moves.push(this.customMove(CustomMoveType.Pass))

    return moves
  }

  onCustomMove(move: CustomMove) {
    if (isCustomMoveType(CustomMoveType.Pass)) return [this.startRule(RuleId.Effect)]
    this.inShapeEffect!.effect.count -= move.data
    this.pushEffect({
      effect: {
        type: EffectType.PullPawn,
        pawn: Pawn.Fame,
        count: move.data,
      },
      sources: [{
        type: MaterialType.PowerCard,
        indexes: this.material(MaterialType.PowerCard).id(PowerCard.InShape).getIndexes()
      }],
      target: this.player
    })

    if (!this.inShapeEffect!.effect.count) return [this.startRule(RuleId.Effect)]
    return []
  }

  get inShapeEffect() {
    return this.effects.find((e) => e.effect.type === EffectType.InShape)
  }

  get energy() {
    return this
      .material(MaterialType.Energy)
      .player(this.player)
  }

}