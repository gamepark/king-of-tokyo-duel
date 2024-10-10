import { KeepRule } from '../KeepRule'


// TODO : Prevent damages
export class TrendSetterKeepRule extends KeepRule {
  ignoredSmash(): number {
    if (this.isConsumed || this.getActivePlayer() === this.cardPlayer) return 0
    if (!this.isFameOnBuzzToken) return 0
    this.markKeepCardConsumed()
    return 1
  }

  get isFameOnBuzzToken() {
    return false
  }
}