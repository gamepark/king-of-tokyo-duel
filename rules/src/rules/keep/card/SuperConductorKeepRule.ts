import sumBy from 'lodash/sumBy'
import { DiceFace } from '../../../material/DiceFace'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { EffectType } from '../../effects/EffectType'
import { KeepHelper } from '../../helper/KeepHelper'
import { KeepRule } from '../KeepRule'


export class SuperConductorKeepRule extends KeepRule {
  afterResolvingDiceFace(face: DiceFace) {
    if (this.getActivePlayer() === this.cardPlayer) return
    if (face !== DiceFace.Energy) return
    if (!this.gainedRivalEnergy) return
    this.unshiftEffect({ type: EffectType.SuperConductor }, this.cardPlayer)
  }

  get gainedRivalEnergy() {
    return this.rivalEnergyDice +
      sumBy(new KeepHelper(this.game).getBonusFaces(DiceFace.Claw), (bonus) => bonus.count)
  }

  get rivalEnergyDice() {
    return this
      .material(MaterialType.Dice)
      .location(LocationType.PlayerRolledDice)
      .player(this.rival)
      .rotation(DiceFace.Energy)
      .length
  }
}