import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { Monster } from '../../../material/Monster'
import { EffectType, Smash } from '../../effects/EffectType'
import { EffectWithSource } from '../../effects/EffectWithSource'
import { Memory } from '../../Memory'
import { KeepRule } from '../KeepRule'


export class UnstableDnaKeepRule extends KeepRule {
  afterSmashTakenComputed(player: Monster) {
    if (player !== this.cardPlayer) return
    if (!this.rivalKeepCards.length) return
    if (this.smashEffect.effect.count < 3) return
    this.unshiftEffect(
      { type: EffectType.UnstableDna },
      this.cardPlayer
    )
  }

  get smashEffect() {
    return this.remind<EffectWithSource<Smash>>(Memory.CurrentEffect)
  }

  get rivalKeepCards() {
    return this
      .material(MaterialType.PowerCard)
      .location(LocationType.PlayerKeepCards)
      .player(this.rival)
  }
}