import { getEnumValues, isEndGame, MaterialMove } from '@gamepark/rules-api'
import { DiceFace } from '../../../material/DiceFace'
import { MaterialType } from '../../../material/MaterialType'
import { Pawn } from '../../../material/Pawn'
import { PullPawnHelper } from '../../helper/PullPawnHelper'
import { SmashHelper } from '../../helper/SmashHelper'
import { KeepRule } from '../KeepRule'


export class UtterDestructionKeepRule extends KeepRule {
  afterRollingDice(): MaterialMove[] {
    if (this.getActivePlayer() !== this.cardPlayer) return []

    const moves: MaterialMove[] = []
    if (getEnumValues(DiceFace).every((face) => this.countDiceFaces(face) > 0)) {
      const pullPawnhelper = new PullPawnHelper(this.game, this.cardPlayer)

      moves.push(...pullPawnhelper.pull(Pawn.Destruction, 2))
      if (moves.some(isEndGame)) return moves

      moves.push(...pullPawnhelper.pull(Pawn.Fame, 2))
      if (moves.some(isEndGame)) return moves

      moves.push(...new SmashHelper(this.game, this.rival).smash(MaterialType.PowerCard, [this.cardIndex], 2))
    }

    return moves
  }

  countDiceFaces(dice: DiceFace) {
    // TODO: some effect can add "additional faces"
    return this.rolledDice.rotation(dice).length
  }
}