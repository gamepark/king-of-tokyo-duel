import { DiceFace } from '../../../material/DiceFace'
import { KeepRule } from '../KeepRule'

export class InTheShadowsKeepRule extends KeepRule {
  canReroll(face: DiceFace): boolean {
    if (this.getActivePlayer() !== this.cardPlayer) return false
    return face === DiceFace.Fame
  }
}