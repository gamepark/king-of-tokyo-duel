import { MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '../../../material/MaterialType'
import { RuleId } from '../../RuleId'
import { KeepRule } from '../KeepRule'


export class TitanicBatteriesKeepRule extends KeepRule {
  afterRollingDice(): MaterialMove[] {
    if (this.getActivePlayer() !== this.cardPlayer) return []
    if (this.bonusTokensCount === 2) return []
    return [this.startRule(RuleId.TitanicBatteries)]
  }

  get bonusTokensCount() {
    return this
      .material(MaterialType.DiceToken)
      .player(this.cardPlayer)
      .length
  }
}