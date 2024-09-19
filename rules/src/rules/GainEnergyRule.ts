import { PlayerTurnRule } from "@gamepark/rules-api";
import { DiceFace } from '../material/DiceFace'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class GainEnergyRule extends PlayerTurnRule {

  onRuleStart() {
    const energies = this.energyDice
    if (!energies) return [this.startRule(RuleId.Smash)]
    return [
      this.material(MaterialType.Energy).createItem({
        location: {
          type: LocationType.PlayerEnergy,
          player: this.player
        },
        quantity: energies
      }),
      this.startRule(RuleId.Smash)
    ]
  }

  get dice() {
    return this
      .material(MaterialType.Dice)
      .location(LocationType.PlayerRolledDice)
      .player(this.player)
  }

  get energyDice() {
    return this
      .dice
      .rotation((r) => r === (DiceFace.Energy))
      .length
  }
}