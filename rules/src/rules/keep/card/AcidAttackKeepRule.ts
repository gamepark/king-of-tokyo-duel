import { DiceFace } from '../../../material/DiceFace'
import { KeepRule } from '../KeepRule'

export class AcidAttackKeepRule extends KeepRule {
  get bonusDiceFaces(): DiceFace[] {
    if (this.getActivePlayer() !== this.cardPlayer) return []
    return [DiceFace.Claw]
  }
}