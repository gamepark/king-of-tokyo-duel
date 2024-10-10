import { KeepRule } from '../KeepRule'

export class RegenerationKeepRule extends KeepRule {
  onHeal() {
    if (this.getActivePlayer() !== this.cardPlayer || this.isConsumed) return 0
    this.markKeepCardConsumed()
    return 1
  }
}