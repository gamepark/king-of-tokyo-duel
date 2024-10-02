import { MaterialType } from '../../material/MaterialType'
import { Pawn } from '../../material/Pawn'
import { PullPawnHelper } from '../helper/PullPawnHelper'
import { AbstractEffectRule } from './AbstractEffectRule'
import { PullDestruction } from './EffectType'

export class PullDestructionEffectRule extends AbstractEffectRule<PullDestruction> {
  getMoves() {
    const destructionCount = this.effect.count
    if (!destructionCount) return []
    return new PullPawnHelper(this.game, this.player).pull(Pawn.Destruction, destructionCount)
  }

  get destructionToken() {
    return this.material(MaterialType.Pawn).id(Pawn.Destruction)
  }
}