import { MaterialMove } from '@gamepark/rules-api/dist/material/moves/MaterialMove'
import { DiceFace } from '../material/DiceFace'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { GainEnergy } from './effects/EffectType'
import { KeepHelper } from './helper/KeepHelper'
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
      new KeepHelper(this.game).afterResolvingDiceFace(DiceFace.Energy)
    }

    moves.push(this.startRule(RuleId.Effect))

    return moves
  }
}