import { KeepRule } from '../KeepRule'

export class HibernationKeepRule extends KeepRule {
  immune() {
    return this.getActivePlayer() === this.cardPlayer;
  }

}