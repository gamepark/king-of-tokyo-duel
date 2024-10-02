import { MaterialMove } from '@gamepark/rules-api'
import { DiceFace } from '../../../material/DiceFace'
import { Pawn } from '../../../material/Pawn'
import { PullPawnHelper } from '../../helper/PullPawnHelper'
import { KeepRule } from '../KeepRule'


export class SignatureMoveKeepRule extends KeepRule {
  afterRollingDice(): MaterialMove[] {
    if (this.getActivePlayer() !== this.cardPlayer) return []
    const pullCount = Math.floor(this.countPowerDice.length / 3)
    if (!pullCount) return []
    return new PullPawnHelper(this.game, this.cardPlayer).pull(Pawn.Fame, pullCount)
  }

  get countPowerDice() {
    return this.rolledDice.rotation(DiceFace.Power)
  }
}