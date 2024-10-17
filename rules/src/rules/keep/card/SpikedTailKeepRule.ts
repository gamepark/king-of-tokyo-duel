import { PowerCard } from '../../../material/cards/PowerCard'
import { MaterialType } from '../../../material/MaterialType'
import { Pawn } from '../../../material/Pawn'
import { EffectType } from '../../effects/EffectType'
import { KeepRule } from '../KeepRule'


export class SpikedTailKeepRule extends KeepRule {
  afterPullPawn(pawn: Pawn) {
    if (this.getActivePlayer() !== this.cardPlayer || pawn !== Pawn.Destruction) return
    const spikedTailSmash = this.spikedTailSmash
    if (spikedTailSmash) {
      spikedTailSmash.effect.count += 1
    } else {
      this.pushEffect({
        type: EffectType.Smash,
        count: 1
      }, this.rival)
    }
  }

  get spikeTail() {
    return this.material(MaterialType.PowerCard)
      .id(PowerCard.SpikedTail)
  }

  get spikedTailSmash() {
    return this.effects
      .find((e) =>
        e.effect.type === EffectType.Smash &&
        e.sources.some((source) => source.type === MaterialType.PowerCard && source.indexes.includes(this.spikeTail.getIndex()))
      )
  }
}