import { Pawn } from '../../material/Pawn'
import { PullPawnHelper } from '../helper/PullPawnHelper'
import { AbstractEffectRule } from './AbstractEffectRule'
import { PullFame } from './EffectType'

export class PullFameEffectRule extends AbstractEffectRule<PullFame> {
  getMoves() {
    const fameCount = this.effect.count
    if (!fameCount) return []
    return new PullPawnHelper(this.game, this.player).pull(Pawn.Fame, fameCount)
  }

}