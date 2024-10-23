import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { PowerCard } from '../material/cards/PowerCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { CustomMoveType } from './CustomMoveType'
import { EffectType, GainEnergy } from './effects/EffectType'
import { RuleId } from './RuleId'

export class SuperConductorRule extends BasePlayerTurnRule<GainEnergy> {
  getPlayerMoves() {
    const moves = super.getPlayerMoves()
    moves.push(this.customMove(CustomMoveType.Pass))
    moves.push(this.material(MaterialType.PowerCard).id(PowerCard.Superconductor).moveItem({ type: LocationType.Discard }))
    return moves
  }

  onCustomMove(move: CustomMove) {
    if (isCustomMoveType(CustomMoveType.Pass)(move)) {
      return [this.startPlayerTurn(RuleId.Effect, this.rival)]
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves = super.afterItemMove(move)
    if (isMoveItemType(MaterialType.PowerCard)(move) && move.location.type === LocationType.Discard) {
      const energy = this.currentEffect.effect.count
      this.unshiftEffect({
        effect: {
          type: EffectType.GainEnergy,
          count: energy
        },
        sources: [{
          type: MaterialType.PowerCard,
          indexes: this.material(MaterialType.PowerCard).id(PowerCard.Superconductor).getIndexes(),
          count: energy
        }],
        target: this.player
      })

      moves.push(this.startPlayerTurn(RuleId.Effect, this.rival))
    }
    return moves
  }
}