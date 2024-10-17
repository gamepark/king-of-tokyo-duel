import { MaterialMove } from '@gamepark/rules-api/dist/material/moves/MaterialMove'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnEffectRule } from './BasePlayerTurnEffectRule'
import { GainWhiteDiceToken } from './effects/EffectType'
import { RuleId } from './RuleId'

export class GainWhiteDiceTokenRule extends BasePlayerTurnEffectRule<GainWhiteDiceToken> {
  onRuleStart() {
    const countTokens = this.countTokens
    const moves: MaterialMove[] = []
    if (countTokens < 2) {
      moves.push(
        this
          .material(MaterialType.DiceToken)
          .createItem({
            location: {
              type: LocationType.PlayerDiceToken,
              player: this.currentEffect.target
            },
            quantity: this.currentEffect.effect.count
          })
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