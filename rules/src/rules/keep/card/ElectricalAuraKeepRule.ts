import { MaterialType } from '../../../material/MaterialType'
import { Pawn } from '../../../material/Pawn'
import { EffectType } from '../../effects/EffectType'
import { KeepRule } from '../KeepRule'

export class ElectricalAuraKeepRule extends KeepRule {
  atEndOfTurn() {
    if (this.getActivePlayer() !== this.cardPlayer) return
    const energy = this.energy
    const quantity = Math.floor(energy / 7)
    if (quantity) {
      this.pushEffect({
        type: EffectType.PullPawn,
        pawn: Pawn.Destruction,
        count: quantity,
      }, this.cardPlayer)
    }
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