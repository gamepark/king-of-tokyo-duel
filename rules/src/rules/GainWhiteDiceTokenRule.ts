import { MaterialMove } from '@gamepark/rules-api/dist/material/moves/MaterialMove'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { GainWhiteDiceToken } from './effects/EffectType'
import { RuleId } from './RuleId'

export class GainWhiteDiceTokenRule extends BasePlayerTurnRule<GainWhiteDiceToken> {
  onRuleStart() {
    const countTokens = this.countTokens
    const moves: MaterialMove[] = []
    if (countTokens < 2) {
      moves.push(
        this
          .material(MaterialType.DiceToken)
          .location(LocationType.WhiteTokenStock)
          .moveItem({
              type: LocationType.PlayerDiceToken,
              player: this.currentEffect.target
            },
            this.currentEffect.effect.count
          )
      )
    }

    moves.push(this.startRule(RuleId.Effect))
    return moves
  }

  get countTokens() {
    return this
      .material(MaterialType.DiceToken)
      .location(LocationType.PlayerDiceToken)
      .player(this.player)
      .getQuantity()
  }
}