import { MaterialMove } from '@gamepark/rules-api'
import { DiceFace } from '../../material/DiceFace'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { BasePlayerTurnRule } from '../BasePlayerTurnRule'
import { KeepHelper } from '../helper/KeepHelper'
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
    return this.powerDice.length + new KeepHelper(this.game).getBonusFaces(DiceFace.Power).length - this.consumedPower
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

  stopPower() {
    this.memorize(Memory.DiceFacesSolved, (faces: DiceFace[] = []) => {
      faces.push(DiceFace.Power)
      return faces
    })
  }

  getPlayerMoves(): MaterialMove[] {
    return [] // Do not authorize "anytime during turn" moves in the middle of resolving a monster power
  }
}