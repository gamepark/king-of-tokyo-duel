import { MaterialType } from '../../material/MaterialType'
import { Pawn } from '../../material/Pawn'
import { AbstractEffectRule } from './AbstractEffectRule'
import { PullDestruction } from './EffectType'

export class PullDestructionEffectRule extends AbstractEffectRule<PullDestruction> {
  getMoves() {
    const destructionToken = this.destructionToken
    const isLeft = this.game.players[0] === this.player
    const destructionCount = this.effect.count
    const item = destructionToken.getItem()!
    const newX = isLeft ? Math.max(0, item.location.x! - (destructionCount * 2)) : Math.min(28, item.location.x! + (destructionCount * 2))

    if (item.location.x === newX) return []
    return [
      destructionToken
        .moveItem((item) => ({ ...item.location, x: newX }))
    ]
  }

  get destructionToken() {
    return this.material(MaterialType.Pawn).id(Pawn.Destruction)
  }
}