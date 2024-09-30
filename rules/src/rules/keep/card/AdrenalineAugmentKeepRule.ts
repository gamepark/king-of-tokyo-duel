import { DiceFace } from '../../../material/DiceFace'
import { KeepRule } from '../KeepRule'

export class AdrenalineAugmentKeepRule extends KeepRule {
  get bonusDiceFaces(): DiceFace[] {
    // TODO: define the "SPOTLIGHT" zone
    return [];
  }


}