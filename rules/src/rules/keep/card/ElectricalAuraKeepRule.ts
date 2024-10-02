import { MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '../../../material/MaterialType'
import { Pawn } from '../../../material/Pawn'
import { PullPawnHelper } from '../../helper/PullPawnHelper'
import { KeepRule } from '../KeepRule'

export class ElectricalAuraKeepRule extends KeepRule {
  atEndOfTurn(): MaterialMove[] {
    if (this.getActivePlayer() !== this.cardPlayer) return []
    const energy = this.energy
    const quantity = Math.floor(energy / 7)
    if (quantity) {
      return new PullPawnHelper(this.game, this.player).pull(Pawn.Destruction, quantity)
    }

    return []
  }

  get energy() {
    return this
      .material(MaterialType.Energy)
      .player(this.player)
      .getQuantity()
  }

  get player() {
    return this.game.rule!.player!
  }
}