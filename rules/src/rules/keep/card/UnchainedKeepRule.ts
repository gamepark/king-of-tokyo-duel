import { KeepRule } from '../KeepRule'


export class UnchainedKeepRule extends KeepRule {
  get buzzBonusAlternatives(): number | undefined {
    if (this.getActivePlayer() !== this.cardPlayer) return
    return 1000
  }
}