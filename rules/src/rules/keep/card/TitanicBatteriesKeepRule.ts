import { MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { RuleId } from '../../RuleId'
import { KeepRule } from '../KeepRule'


export class TitanicBatteriesKeepRule extends KeepRule {
  atStartOfResolving(): MaterialMove[] {
    if (this.getActivePlayer() !== this.cardPlayer || this.isConsumed) return []
    if (this.bonusTokensCount === 2) return []
    this.markKeepCardConsumed()
    return [this.startRule(RuleId.TitanicBatteries)]
  }

  get bonusTokensCount() {
    return this
      .material(MaterialType.DiceToken)
      .location(LocationType.PlayerDiceToken)
      .player(this.cardPlayer)
      .length
  }
}