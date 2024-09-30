import { Pawn } from '../../../material/Pawn'
import { KeepRule } from '../KeepRule'

export class LightningSpeedKeepRule extends KeepRule {
  afterPullPawn(_pawn: Pawn) {
    if (this.getActivePlayer() !== this.cardPlayer) return []
    // TODO: If the pawn move on empty space on buzz token apply smash
    return []
  }
}