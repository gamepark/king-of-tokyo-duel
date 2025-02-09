import { PowerCard } from '../material/cards/PowerCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { KeepHelper } from './helper/KeepHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class OnStartTurnRule extends BasePlayerTurnRule {
  onRuleStart() {
    this.memorize(Memory.Phase, RuleId.OnStartTurn)

    if (this.canHibernate) {
      return [this.startRule(RuleId.Hibernation)]
    }

    const keepMoves = new KeepHelper(this.game).atStartOfTurn()

    if (keepMoves.length) {
      return keepMoves
    }

    if (this.remind(Memory.Dominate)) {
      return [this.startRule(RuleId.Dominate)]
    }

    return [this.startRule(RuleId.RollDice)]
  }

  get canHibernate() {
    if (!this.player) return false
    return this
      .material(MaterialType.PowerCard)
      .location(LocationType.PlayerKeepCards)
      .id(PowerCard.Hibernation)
      .player(this.player).length > 0
  }
}
