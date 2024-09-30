import { MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { Pawn } from '../../../material/Pawn'
import { KeepRule } from '../KeepRule'


export class ScrappyKeepRule extends KeepRule {
  afterPullPawn(_pawn: Pawn): MaterialMove[] {
    if (this.getActivePlayer() !== this.cardPlayer) return []
    if (this.bonusTokensCount === 2) return []
    return [
      this.material(MaterialType.DiceToken)
        .createItem({
          location: {
            type: LocationType.PlayerDiceToken,
            player: this.cardPlayer
          }
        })
    ]
  }

  get bonusTokensCount() {
    return this
      .material(MaterialType.DiceToken)
      .player(this.cardPlayer)
      .length
  }
}