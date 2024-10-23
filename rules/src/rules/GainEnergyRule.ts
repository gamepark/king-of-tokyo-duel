import { MaterialMove } from '@gamepark/rules-api/dist/material/moves/MaterialMove'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { GainEnergy } from './effects/EffectType'
import { KeepHelper } from './helper/KeepHelper'
import { RuleId } from './RuleId'

export class GainEnergyRule extends BasePlayerTurnRule<GainEnergy> {

  onRuleStart() {
    const moves: MaterialMove[] = []
    moves.push(
      this.material(MaterialType.Energy).createItem({
        location: {
          type: LocationType.PlayerEnergy,
          player: this.currentEffect.target
        },
        quantity: this.currentEffect.effect.count
      })
    )

    new KeepHelper(this.game).onGainEnergy(this.currentEffect.target, this.currentEffect.effect.count)

    moves.push(this.startRule(RuleId.Effect))

    return moves
  }
}