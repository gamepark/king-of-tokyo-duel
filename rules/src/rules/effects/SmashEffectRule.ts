import { MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '../../material/MaterialType'
import { SmashHelper } from '../helper/SmashHelper'
import { AbstractEffectRule } from './AbstractEffectRule'
import { Smash } from './EffectType'

export class SmashEffectRule extends AbstractEffectRule<Smash> {
  getMoves() {
    const rivalDamages = this.effect.rival ?? 0
    const myDamages = this.effect.me ?? 0
    const moves: MaterialMove[] = []
    if (myDamages > 0) {
      const helper = new SmashHelper(this.game, this.player)
      moves.push(
        ...helper.smash(MaterialType.EnergyCard, [this.cardIndex], myDamages),
        ...helper.onSmash(myDamages)
      )
    }

    if (rivalDamages > 0) {
      const helper = new SmashHelper(this.game, this.rival)
      moves.push(
        ...helper.smash(MaterialType.EnergyCard, [this.cardIndex], rivalDamages),
        ...helper.onSmash(rivalDamages)
      )
    }

    return moves
  }
}