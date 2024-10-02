import { MaterialMove } from '@gamepark/rules-api'
import { Pawn } from '../../../material/Pawn'
import { PullPawnHelper } from '../../helper/PullPawnHelper'
import { KeepRule } from '../KeepRule'

export class BreakingNewsKeepRule extends KeepRule {
  onBuyPowerCard(): MaterialMove[] {
    if (this.getActivePlayer() !== this.cardPlayer) return []
    return new PullPawnHelper(this.game, this.player).pull(Pawn.Fame, 1)
  }

  get player() {
    return this.game.rule!.player!
  }
}