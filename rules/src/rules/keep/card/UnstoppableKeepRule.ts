import { MaterialType } from '../../../material/MaterialType'
import { Monster } from '../../../material/Monster'
import { KeepRule } from '../KeepRule'


export class UnstoppableKeepRule extends KeepRule {
  ignoredSmash(player: Monster, damages: number): number {
    if (this.cardPlayer !== player) return 0
    if (this.isConsumed) {
      return Infinity
    }

    if (this.healthWheelValue - damages <= 0) {
      this.markKeepCardConsumed()
      return this.healthWheelValue - 1
    }

    return 0
  }

  get healthWheelValue(): number {
    return this
      .material(MaterialType.HealthCounter)
      .player(this.cardPlayer)
      .getItem()!
      .location.rotation
  }
}