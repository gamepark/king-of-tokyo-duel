import { CustomMove, isCustomMoveType } from '@gamepark/rules-api/dist/material/moves/CustomMove'
import { MaterialMove } from '@gamepark/rules-api/dist/material/moves/MaterialMove'
import { getEnumValues } from '@gamepark/rules-api/dist/utils/enum.util'
import { DiceFace } from '../../material/DiceFace'
import { CustomMoveType } from '../CustomMoveType'
import { RuleId } from '../RuleId'
import { PowerRule } from './PowerRule'

export class AlienoidRule extends PowerRule {
  getPlayerMoves(): MaterialMove<number, number, number>[] {
    const remainingPower = this.remainingPower
    if (remainingPower < 2) return []
    const moves =  getEnumValues(DiceFace)
      .filter((face) => face !== DiceFace.Power)
      .flatMap((face: DiceFace) => {
        const alienoidMoves = [this.customMove(CustomMoveType.Alienoid, { face: face, count: 2 })]
        if (remainingPower > 2) {
          alienoidMoves.push(this.customMove(CustomMoveType.Alienoid, { face: face, count: 4 }))
        }

        return alienoidMoves
      })

    moves.push(this.customMove(CustomMoveType.Pass))
    return moves
  }

  onCustomMove(move: CustomMove) {
    if (isCustomMoveType(CustomMoveType.Alienoid)(move)) {
      this.consumePower(move.data.count === 2? 2: 3)
      this.stopPower()
    }
    return [this.startRule(RuleId.ResolveDice)]
  }
}