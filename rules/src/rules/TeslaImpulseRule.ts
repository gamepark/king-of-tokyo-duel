import { isMoveItemType, ItemMove } from '@gamepark/rules-api'
import { PowerCard } from '../material/cards/PowerCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { EffectType } from './effects/EffectType'
import { RuleId } from './RuleId'

export class TeslaImpulseRule extends BasePlayerTurnRule {
  getPlayerMoves() {
    const moves = super.getPlayerMoves()
    if (!this.rivalKeepCards.length) return [this.startRule(RuleId.Effect)]
    moves.push(
      ...this.rivalKeepCards.moveItems({
        type: LocationType.Discard
      })
    )

    return moves
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.PowerCard)(move) || move.location.type !== LocationType.Discard) return []
    this.unshiftEffect({
      effect: {
        type: EffectType.GainEnergy,
        count: 2
      },
      sources: [{
        type: MaterialType.PowerCard,
        indexes: [this.material(MaterialType.PowerCard).id(PowerCard.TeslaImpulse).getIndex()]
      }],
      target: this.player
    })

    return [this.startRule(RuleId.Effect)]
  }

  get rivalKeepCards() {
    return this
      .material(MaterialType.PowerCard)
      .location(LocationType.PlayerKeepCards)
      .player(this.rival)
  }
}