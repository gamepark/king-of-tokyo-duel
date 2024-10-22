import { MaterialMove } from '@gamepark/rules-api/dist/material/moves/MaterialMove'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { GainEnergy } from './effects/EffectType'
import { Memory } from './Memory'
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

    if (this.remind(Memory.Phase) === RuleId.ResolveDice) {
      this.memorize(Memory.ResolveDiceEnergyGain, gain => (gain ?? 0) + this.currentEffect.effect.count)
    }

    moves.push(this.startRule(RuleId.Effect))

    return moves
  }
}