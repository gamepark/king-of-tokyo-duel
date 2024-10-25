import { CustomMove, isCustomMoveType } from '@gamepark/rules-api/dist/material/moves/CustomMove'
import { MaterialMove } from '@gamepark/rules-api/dist/material/moves/MaterialMove'
import { getEnumValues } from '@gamepark/rules-api/dist/utils/enum.util'
import { DiceFace } from '../../material/DiceFace'
import { CustomMoveType } from '../CustomMoveType'
import { Memory } from '../Memory'
import { RollDiceRule } from '../RollDiceRule'
import { PowerRule } from './PowerRule'

export class AlienoidRule extends PowerRule {
  getPlayerMoves() {
    const remainingPower = this.remainingPower
    const extra: DiceFace = this.remind(Memory.AlienoidExtra)
    const moves: MaterialMove[] = []
    if (extra !== undefined && remainingPower >= 1) {
      moves.push(
        this.customMove(CustomMoveType.ChooseDiceFace, extra)
      )
      moves.push(this.customMove(CustomMoveType.Pass))
    } else {
      moves.push(
        ...getEnumValues(DiceFace)
          .filter(face => face !== DiceFace.Power)
          .map(face => this.customMove(CustomMoveType.ChooseDiceFace, face))
      )
    }

    return moves
  }

  onCustomMove(move: CustomMove) {
    if (isCustomMoveType(CustomMoveType.ChooseDiceFace)(move)) {
      this.addExtraFace(move.data)
      if (this.remind(Memory.AlienoidExtra)) {
        this.consumePower(1)
        this.forget(Memory.AlienoidExtra)
        if (this.remainingPower >= 2) return []
      } else {
        this.consumePower(2)
        this.memorize(Memory.AlienoidExtra, move.data)
        if (this.remainingPower >= 1) return []
      }
    } else if (isCustomMoveType(CustomMoveType.Pass)) {
      this.forget(Memory.AlienoidExtra)
      if (this.remainingPower >= 2) return []
    }
    return new RollDiceRule(this.game).goToPhase2()
  }

  addExtraFace(face: DiceFace) {
    this.memorize(Memory.ExtraDiceFaces, (faces: DiceFace[] = []) => {
      faces.push(face)
      return faces
    })
  }

  onRuleEnd() {
    this.forget(Memory.AlienoidExtra)
    return []
  }
}
