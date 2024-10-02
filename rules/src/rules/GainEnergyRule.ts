import { DiceFace } from '../material/DiceFace'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { EnergyHelper } from './helper/EnergyHelper'
import { KeepHelper } from './helper/KeepHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class GainEnergyRule extends BasePlayerTurnRule {

  onRuleStart() {
    return [
      ...new EnergyHelper(this.game, this.player).gain(this.countEnergy),
      this.startRule(RuleId.ResolveDice)
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

  get countEnergy() {
    return this.energyDice +
      new KeepHelper(this.game).bonusDiceFaces.filter((f) => f === DiceFace.Energy).length
  }

  onRuleEnd() {
    this.memorize(Memory.DiceFacesSolved, (faces: DiceFace[] = []) => {
      faces.push(DiceFace.Energy)
      return faces
    })
    return []
  }
}