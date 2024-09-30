import { PlayerTurnRule } from '@gamepark/rules-api'
import { DiceFace } from '../material/DiceFace'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { EnergyHelper } from './helper/EnergyHelper'
import { RuleId } from './RuleId'

export class GainEnergyRule extends PlayerTurnRule {

  onRuleStart() {
    const energies = this.energyDice
    if (!energies) return [this.startRule(RuleId.Heal)]
    return [
      ...new EnergyHelper(this.game, this.player).gain(energies),
      this.startRule(RuleId.Heal)
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
      .rotation(DiceFace.Energy)
      .length
  }
}