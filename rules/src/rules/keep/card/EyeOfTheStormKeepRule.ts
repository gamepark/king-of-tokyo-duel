import { MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { Memory } from '../../Memory'
import { KeepRule } from '../KeepRule'

export class EyeOfTheStormKeepRule extends KeepRule {
  afterRollingDice(): MaterialMove[] {
    if (this.getActivePlayer() !== this.cardPlayer) return []
    const notUsedRolls = this.notUsedRolls
    if (notUsedRolls > 0) {
      return [
        this
          .material(MaterialType.Energy)
          .createItem({
            location: {
              type: LocationType.PlayerEnergy,
              player: this.player
            },
            quantity: notUsedRolls
          })
      ]
    }

    return []
  }

  get notUsedRolls() {
    return 3 - (this.remind(Memory.RollCount) ?? 0)
  }

  get player() {
    return this.game.rule!.player!
  }
}