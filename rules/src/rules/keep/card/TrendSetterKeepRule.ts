import { isMoveItemType, ItemMove } from '@gamepark/rules-api'
import { MaterialType } from '../../../material/MaterialType'
import { KeepRule } from '../KeepRule'


export class TrendSetterKeepRule extends KeepRule {
  ignoredSmash(): number {
    if (this.isConsumed || this.getActivePlayer() === this.cardPlayer) return 0
    // TODO: has priority on ArmorPlating ?
    if (!this.isFameOnBuzzToken) return 0
    this.markKeepCardConsumed()
    return 1
  }

  beforeItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.HealthCounter)(move)) return []
    if (this.isConsumed) return []
    // TODO: has priority on ArmorPlating ? Means that it tank the first damage
    const healthCounter = this.material(MaterialType.HealthCounter).getItem(move.itemIndex)
    if (healthCounter.location.rotation > move.location.rotation) this.markKeepCardConsumed()
    return []
  }

  get isFameOnBuzzToken() {
    // TODO: define it when locations are defined
    return false
  }
}