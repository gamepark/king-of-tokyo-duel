import { KeepRule } from '../KeepRule'

export class ArmorPlatingKeepRule extends KeepRule {
  ignoredSmash(): number {
    if (this.isConsumed || this.getActivePlayer() === this.cardPlayer) return 0
    this.markKeepCardConsumed()
    return 1
  }
}