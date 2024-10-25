import { MaterialMove } from '@gamepark/rules-api'
import { DiceFace } from '../../material/DiceFace'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { BasePlayerTurnRule } from '../BasePlayerTurnRule'
import { RollHelper } from '../helper/RollHelper'
import { Memory } from '../Memory'

export class PowerRule extends BasePlayerTurnRule {
  minPowerCost = 2

  canUsePower() {
    return this.remainingPower >= this.minPowerCost
  }

  consumePower(powers: number) {
    this.memorize(Memory.ConsumedPower, (count: number = 0) => count + powers)
  }

  get remainingPower() {
    return new RollHelper(this.game).countFace(DiceFace.Power) - this.consumedPower
  }

  get powerDice() {
    return this
      .material(MaterialType.Dice)
      .location(LocationType.PlayerRolledDice)
      .player(this.player)
      .rotation(DiceFace.Power)
  }

  get consumedPower() {
    return this.remind(Memory.ConsumedPower) ?? 0
  }

  getPlayerMoves(): MaterialMove[] {
    return [] // Do not authorize "anytime during turn" moves in the middle of resolving a monster power
  }
}