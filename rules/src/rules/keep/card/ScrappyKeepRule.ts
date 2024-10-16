import { MaterialType } from '../../../material/MaterialType'
import { EffectType } from '../../effects/EffectType'
import { KeepRule } from '../KeepRule'


export class ScrappyKeepRule extends KeepRule {
  afterPullPawn() {
    if (this.getActivePlayer() !== this.cardPlayer) return
    if (this.bonusTokensCount === 2) return

    // TODO @rfromi: define "each time you pull the pawn marker of a buzz token"
    this.pushEffect({
      type: EffectType.GetWhiteDiceToken,
      count: 1
    }, this.cardPlayer)
  }

  get bonusTokensCount() {
    return this
      .material(MaterialType.DiceToken)
      .player(this.cardPlayer)
      .length
  }
}