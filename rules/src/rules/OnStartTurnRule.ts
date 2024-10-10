import { isStartRule, MaterialMove } from '@gamepark/rules-api'
import { PowerCard } from '../material/cards/PowerCard'
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

    if (!this.getPlayerMoves().length) {
      return [this.startRule(RuleId.RollDice)]
    }

    const moves = this.getPlayerMoves()
    if (moves.length === 1 && moves.find((m) => isStartRule(m) && (m.id === RuleId.Dominate || m.id === RuleId.RollDice))) {
      return [moves[0]]
    }

    return []
  }

  getPlayerMoves() {
    const moves: MaterialMove[] = new KeepHelper(this.game).atStartOfTurn()
    if (moves.length) return moves
    if (this.remind(Memory.Dominate)) {
      moves.push(this.startRule(RuleId.Dominate))
    } else {
      moves.push(this.startRule(RuleId.RollDice))
    }
    return moves
  }

  get canHibernate() {
    return this
      .material(MaterialType.PowerCard)
      .id(PowerCard.Hibernation)
      .player(this.player).length > 0
  }
}