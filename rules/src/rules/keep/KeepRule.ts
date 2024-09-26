import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'

export class KeepRule extends MaterialRulesPart {
  atStartOfTurn(): MaterialMove[] {
    return []
  }

  afterResolvingDice(): MaterialMove[] {
    return []
  }

  get canReroll(): boolean {
    return false
  }

  afterRollingDice(): MaterialMove[] {
    return []
  }

  onPullDestruction(): MaterialMove[] {
    return []
  }

  onSmashTaken(): MaterialMove[] {
    return []
  }

  onPawnMoves(): MaterialMove[] {
    return []
  }

  duringTurn(): MaterialMove[] {
    return []
  }

  onBuyPowerCard

}