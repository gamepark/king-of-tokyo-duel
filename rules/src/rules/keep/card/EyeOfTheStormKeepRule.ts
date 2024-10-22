import { MaterialMove } from '@gamepark/rules-api'
import { EffectType } from '../../effects/EffectType'
import { KeepHelper } from '../../helper/KeepHelper'
import { Memory } from '../../Memory'
import { KeepRule } from '../KeepRule'

export class EyeOfTheStormKeepRule extends KeepRule {
  afterRollingDice(): MaterialMove[] {
    if (this.getActivePlayer() !== this.cardPlayer || this.isConsumed) return []
    const notUsedRolls = this.notUsedRolls
    if (notUsedRolls > 0) {
      this.markKeepCardConsumed()
      this.pushEffect({
        type: EffectType.GainEnergy,
        count: notUsedRolls
      }, this.cardPlayer)
    }

    return []
  }

  get notUsedRolls() {
    return this.maxRollCount - (this.remind(Memory.RollCount) ?? 0)
  }

  get maxRollCount() {
    return 3 + new KeepHelper(this.game).additionalRolls
  }

  get player() {
    return this.game.rule!.player!
  }
}