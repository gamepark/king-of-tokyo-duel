import { MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { Monster } from '../../../material/Monster'
import { RuleId } from '../../RuleId'
import { KeepRule } from '../KeepRule'


export class UnstableDnaKeepRule extends KeepRule {
  afterSmashTakenComputed(player: Monster , source: number): MaterialMove[] {
    if (player !== this.cardPlayer) return []
    if (!this.rivalKeepCards.length) return []
    // Here, we explicitely called
    // TODO: per attack or cummulative ?
    if (source < 3) return []
    if (player === this.getActivePlayer()) {
      return [this.startRule(RuleId.UnstableDna)]
    } else {
      return [this.startPlayerTurn(RuleId.UnstableDna, player)]
    }
  }

  get rivalKeepCards() {
    return this
      .material(MaterialType.PowerCard)
      .location(LocationType.PlayerKeepCards)
      .player(this.rival)
  }
}