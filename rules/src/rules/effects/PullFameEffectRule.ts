import { MaterialType } from '../../material/MaterialType'
import { Pawn } from '../../material/Pawn'
import { AbstractEffectRule } from './AbstractEffectRule'
import { PullFame } from './EffectType'

export class PullFameEffectRule extends AbstractEffectRule<PullFame> {
  getMoves() {
    const fameToken = this.fameToken
    const isLeft = this.game.players[0] === this.player
    const fameCount = this.effect.count
    const item = fameToken.getItem()!
    const newX = isLeft ? Math.max(0, item.location.x! - (fameCount * 2)) : Math.min(28, item.location.x! + (fameCount * 2))

    if (item.location.x === newX) return []
    return [
      fameToken
        .moveItem((item) => ({ ...item.location, x: newX }))
    ]
  }

  get fameToken() {
    return this.material(MaterialType.Pawn).id(Pawn.Fame)
  }
}