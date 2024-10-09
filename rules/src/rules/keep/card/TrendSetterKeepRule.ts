import { KeepRule } from '../KeepRule'


export class TrendSetterKeepRule extends KeepRule {
  ignoredSmash(): number {
    if (this.isConsumed || this.getActivePlayer() === this.cardPlayer) return 0
    // TODO: has priority on ArmorPlating ?
    if (!this.isFameOnBuzzToken) return 0
    this.markKeepCardConsumed()
    return 1
  }

  get isFameOnBuzzToken() {
    // TODO: define it when locations are defined
    return false
  }
}