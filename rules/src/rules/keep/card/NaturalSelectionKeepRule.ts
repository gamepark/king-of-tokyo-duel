import { MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '../../../material/MaterialType'
import { SmashHelper } from '../../helper/SmashHelper'
import { KeepRule } from '../KeepRule'

export class NaturalSelectionKeepRule extends KeepRule {
  get additionalDice(): number {
    if (this.getActivePlayer() !== this.cardPlayer) return 0
    return 1
  }

  afterRollingDice(): MaterialMove[] {
    if (this.getActivePlayer() !== this.cardPlayer) return []
    if (this.maxNumberOfAKind < 4) return []
    return new SmashHelper(this.game, this.getActivePlayer()!).smash(MaterialType.PowerCard, [this.cardIndex], 10)
  }
}