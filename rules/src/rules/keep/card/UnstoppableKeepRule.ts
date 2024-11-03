import { MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { Monster } from '../../../material/Monster'
import { EffectType } from '../../effects/EffectType'
import { Memory } from '../../Memory'
import { KeepRule } from '../KeepRule'


export class UnstoppableKeepRule extends KeepRule {
  onDie(player: Monster): MaterialMove[] {
    if (this.cardPlayer !== player || this.isConsumed) return []
    this.markKeepCardConsumed()
    this.unshiftEffect({
      type: EffectType.Heal,
      count: 1
    }, this.cardPlayer)

    this.memorize(Memory.Immune, this.cardPlayer)
    return this
      .material(MaterialType.PowerCard)
      .index(this.cardIndex)
      .moveItems({
        type: LocationType.Discard
      })
  }

  immune(player: Monster): boolean {
    return this.remind(Memory.Immune) === player
  }
}