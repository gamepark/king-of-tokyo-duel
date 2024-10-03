import { Monster } from '../../../material/Monster'
import { KeepRule } from '../KeepRule'

export class ArmorPlatingKeepRule extends KeepRule {
  ignoredSmash(player: Monster): number {
    if (this.isConsumed || player !== this.cardPlayer) return 0
    this.markKeepCardConsumed()
    return 1
  }
}