import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { PowerCard } from '../material/cards/PowerCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { RuleId } from './RuleId'

export class UnstableDnaRule extends BasePlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    this.removeEffect()
    if (!this.rivalKeepCards.length) return [this.startPlayerTurn(RuleId.Effect, this.rival)]
    return [this.startPlayerTurn(RuleId.Effect, this.rival)]
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.PowerCard)(move) && move.location.player === this.player && move.location.type === LocationType.PlayerKeepCards) {
      return this.unstableDna.moveItems({
        type: LocationType.PlayerKeepCards,
        player: this.rival
      })
    }

    return [this.startPlayerTurn(RuleId.Effect, this.rival)]
  }

  get unstableDna() {
    return this.material(MaterialType.PowerCard)
      .id(PowerCard.UnstableDna)
  }

  get rivalKeepCards() {
    return this
      .material(MaterialType.PowerCard)
      .location(LocationType.PlayerKeepCards)
      .player(this.rival)
  }
}