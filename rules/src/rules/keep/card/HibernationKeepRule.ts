import { Monster } from '../../../material/Monster'
import { KeepRule } from '../KeepRule'

export class HibernationKeepRule extends KeepRule {
  immune(target: Monster) {
    // The target is immune if it is its own card
    return target === this.cardPlayer;
  }

}
