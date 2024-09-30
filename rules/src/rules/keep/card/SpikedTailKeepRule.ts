import { MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '../../../material/MaterialType'
import { Pawn } from '../../../material/Pawn'
import { SmashHelper } from '../../helper/SmashHelper'
import { KeepRule } from '../KeepRule'


export class SpikedTailKeepRule extends KeepRule {
  afterPullPawn(pawn: Pawn, count: number): MaterialMove[] {
    if (this.getActivePlayer() !== this.cardPlayer || pawn !== Pawn.Destruction) return []
    return new SmashHelper(this.game, this.rival).smash(MaterialType.PowerCard, [this.cardIndex], count)
  }
}