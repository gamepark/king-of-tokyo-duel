import { MaterialMove } from '@gamepark/rules-api'
import { DiceFace } from '../../../material/DiceFace'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { RuleId } from '../../RuleId'
import { KeepRule } from '../KeepRule'


export class SuperConductorKeepRule extends KeepRule {
  afterResolvingDice(): MaterialMove[] {
    if (this.getActivePlayer() === this.cardPlayer) return []
    if (!this.rivalEnergyGained) return []
    return [this.startPlayerTurn(RuleId.SuperConductor, this.cardPlayer)]
  }

  get rivalEnergyGained() {
    // TODO: additional face ?
    return this
      .material(MaterialType.Dice)
      .location(LocationType.PlayerRolledDice)
      .player(this.rival)
      .rotation(DiceFace.Energy)
      .length
  }
}