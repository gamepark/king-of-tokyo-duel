import { MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { KeepRule } from '../KeepRule'

export class ElectricalAuraKeepRule extends KeepRule {
  atEndOfTurn(): MaterialMove[] {
    if (this.getActivePlayer() !== this.cardPlayer) return []
    const energy = this.energy
    const quantity = Math.floor(energy / 7)
    if (quantity) {
      return [
        this
          .material(MaterialType.Energy)
          .createItem({
            location: {
              type: LocationType.PlayerEnergy,
              player: this.player
            },
            quantity: quantity
          })
      ]
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