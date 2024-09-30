import { KeepRule } from '../KeepRule'

export class GiantBrainKeepRule extends KeepRule {
  get additionalRolls(): number {
    if (this.getActivePlayer() !== this.cardPlayer) return 0
    return 1
  }
}