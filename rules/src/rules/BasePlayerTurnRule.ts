import { MaterialMove, PlayerTurnRule, RuleMove } from '@gamepark/rules-api'
import { Memory } from './Memory'

export class BasePlayerTurnRule extends PlayerTurnRule {
  getNextRule?(): RuleMove

  getNextRuleMove(): MaterialMove[] {
    const previousRule = this.remind(Memory.PreviousRule)
    if (previousRule) {
      this.game.rule = previousRule
      return []
    }

    const nextRule = this.getNextRule?.()
    if (nextRule) {
      return [nextRule]
    }

    return []
  }

  get rival() {
    return this.game.players.find((p) => p !== this.player)!
  }
}