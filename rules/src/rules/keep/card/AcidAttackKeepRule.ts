import { DiceFace } from '../../../material/DiceFace'
import { MaterialType } from '../../../material/MaterialType'
import { KeepRule } from '../KeepRule'

export class AcidAttackKeepRule extends KeepRule {
  getBonusFaces(face: DiceFace) {
    if (this.getActivePlayer() !== this.cardPlayer) return
    if (face !== DiceFace.Claw) return
    return {
      items: [{
        type: MaterialType.PowerCard,
        indexes: [this.cardIndex]
      }],
      count: 1
    }
  }
}