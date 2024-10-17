import { Pawn } from '../../../material/Pawn'
import { KeepRule } from '../KeepRule'

// TODO @rfromi
export class LightningSpeedKeepRule extends KeepRule {
  afterPullPawn(_pawn: Pawn) {
    if (this.getActivePlayer() !== this.cardPlayer) return []
    return []
  }
}