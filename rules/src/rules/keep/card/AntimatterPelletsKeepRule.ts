import { MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '../../../material/MaterialType'
import { Pawn } from '../../../material/Pawn'
import { PullPawnHelper } from '../../helper/PullPawnHelper'
import { SmashHelper } from '../../helper/SmashHelper'
import { Memory } from '../../Memory'
import { KeepRule } from '../KeepRule'

export class AntimatterPelletsKeepRule extends KeepRule {
  afterRollingDice(): MaterialMove[] {
    if (this.getActivePlayer() !== this.cardPlayer) return []
    if (this.maxNumberOfAKind >= 5) {
      const moves: MaterialMove[] = new SmashHelper(this.game, this.rival).smash(MaterialType.PowerCard, [this.cardIndex], 4)

      const pullMoves = new PullPawnHelper(this.game, this.getActivePlayer()!).pull(Pawn.Destruction, 2)
      if (this.remind(Memory.SuspendedDamages) !== undefined) {
        if (pullMoves.length) {
          this.memorize(Memory.FrozenMoves, pullMoves)
        }
        return moves
      }

      return moves
    }

    return []
  }

  get rival() {
    return this.game.players.find((p) => p !== this.getActivePlayer())!
  }
}