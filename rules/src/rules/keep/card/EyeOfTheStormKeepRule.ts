import { MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { KeepHelper } from '../../helper/KeepHelper'
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
    return this.maxRollCount - (this.remind(Memory.RollCount) ?? 0)
  }

  get maxRollCount() {
    return 3 + new KeepHelper(this.game).additionalRolls
  }

  get player() {
    return this.game.rule!.player!
  }
}