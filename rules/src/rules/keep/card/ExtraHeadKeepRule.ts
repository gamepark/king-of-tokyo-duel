import { KeepRule } from '../KeepRule'

export class ExtraHeadKeepRule extends KeepRule {
  get additionalDice(): number {
    if (this.getActivePlayer() !== this.cardPlayer) return 0
    return 1
  }
}