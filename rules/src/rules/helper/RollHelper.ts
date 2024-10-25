import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import sumBy from 'lodash/sumBy'
import { DiceFace } from '../../material/DiceFace'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'
import { KeepHelper } from './KeepHelper'

export class RollHelper extends MaterialRulesPart {
  constructor(game: MaterialGame, private player = game.rule!.player!) {
    super(game)
  }

  countFace(face: DiceFace) {
    return this.getDiceWithFace(face).length
      + this.countBonusFace(face)
      + this.countExtraDice(face)
  }

  getDiceWithFace(face: DiceFace) {
    return this.dice.rotation(face)
  }

  countBonusFace(face: DiceFace) {
    return sumBy(new KeepHelper(this.game).getBonusFaces(face), bonus => bonus.count ?? 0)
  }

  countExtraDice(face: DiceFace) {
    return (this.remind<DiceFace[] | undefined>(Memory.ExtraDiceFaces) ?? []).reduce((sum, f) => f === face ? sum + 1 : sum, 0)
  }

  get dice() {
    return this
      .material(MaterialType.Dice)
      .location(LocationType.PlayerRolledDice)
      .player(this.player)
  }

  get consumedPower() {
    return this.remind(Memory.ConsumedPower) ?? 0
  }
}
