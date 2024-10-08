import { Monster } from '../../../material/Monster'
import { KeepRule } from '../KeepRule'

export class CamouflageKeepRule extends KeepRule {
  canPreventDamagesOn(player: Monster) {
    return player === this.cardPlayer
  }


}