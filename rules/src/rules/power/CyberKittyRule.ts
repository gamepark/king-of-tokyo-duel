import { CustomMove, isCustomMoveType } from '@gamepark/rules-api/dist/material/moves/CustomMove'
import { MaterialMove } from '@gamepark/rules-api/dist/material/moves/MaterialMove'
import { MaterialType } from '../../material/MaterialType'
import { CustomMoveType, PowerUse } from '../CustomMoveType'
import { EffectType } from '../effects/EffectType'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'
import { PowerRule } from './PowerRule'

export class CyberKittyRule extends PowerRule {
  onRuleStart() {
    this.memorize(Memory.Phase, RuleId.CyberKitty)
    const moves = this.getPlayerMoves()
    if (!moves.length) return [this.startRule(RuleId.ResolveDice)]
    if (moves.length === 1) return moves
    return []
  }

  getPlayerMoves(): MaterialMove<number, number, number>[] {
    const remainingPower = this.remainingPower
    const moves: MaterialMove[] = []
    if (!remainingPower) return moves
    moves.push(this.customMove(CustomMoveType.Power, PowerUse.Normal))
    if (remainingPower > 2) {
      moves.push(this.customMove(CustomMoveType.Power, PowerUse.Bonus))
    }

    return moves
  }

  onCustomMove(move: CustomMove) {
    if (!isCustomMoveType(CustomMoveType.Power)(move)) return []
    this.pushEffect({
      effect: {
        type: EffectType.GainEnergy,
        count: move.data === PowerUse.Normal ? 2 : 4
      },
      sources: [{
        type: MaterialType.MonsterBoard,
        indexes: [this.material(MaterialType.MonsterBoard).id(this.player).getIndex()]
      }],
      target: this.player
    })

    this.consumePower((move.data === PowerUse.Normal ? 2 : 3))
    return [this.startRule(RuleId.Effect)]
  }
}