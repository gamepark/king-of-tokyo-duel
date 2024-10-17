import { getBuzzSpaces } from '../../../material/Buzz'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { Pawn } from '../../../material/Pawn'
import { EffectType } from '../../effects/EffectType'
import { KeepRule } from '../KeepRule'

export class ScrappyKeepRule extends KeepRule {
  afterPullPawn(pawn: Pawn) {
    if (this.getActivePlayer() !== this.cardPlayer) return
    if (this.bonusTokensCount === 2) return
    const location = this.material(MaterialType.Pawn).id(pawn).getItem()!.location
    const previousX = this.cardPlayer === this.game.players[0] ? location.x! + 1 : location.x! - 1
    const currentBuzz = this.getBuzzAtX(location.type, location.x!)
    const previousBuzz = this.getBuzzAtX(location.type, previousX)
    if (previousBuzz.length === 1 && previousBuzz.getIndex() !== currentBuzz.getIndex()) {
      this.unshiftEffect({
        type: EffectType.GetWhiteDiceToken,
        count: 1
      }, this.cardPlayer)
    }
  }

  getBuzzAtX(track: LocationType, x: number) {
    return this.material(MaterialType.Buzz).location(track)
      .filter(item => getBuzzSpaces(item.location, item.id!).some(space => Math.abs(space.x - x) <= 0.5))
  }

  get bonusTokensCount() {
    return this
      .material(MaterialType.DiceToken)
      .location(LocationType.PlayerDiceToken)
      .player(this.cardPlayer)
      .length
  }
}