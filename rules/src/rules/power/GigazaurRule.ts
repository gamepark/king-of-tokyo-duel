import { CustomMove, isCustomMoveType } from '@gamepark/rules-api/dist/material/moves/CustomMove'
import { MaterialType } from '../../material/MaterialType'
import { Pawn } from '../../material/Pawn'
import { CustomMoveType } from '../CustomMoveType'
import { EffectType } from '../effects/EffectType'
import { RuleId } from '../RuleId'
import { PowerRule } from './PowerRule'

export class GigazaurRule extends PowerRule {
  getPlayerMoves() {
    if (this.remainingPower < 2) return []
   return [
     this.customMove(CustomMoveType.Pull, Pawn.Fame),
     this.customMove(CustomMoveType.Pull, Pawn.Destruction),
   ]
  }

  onCustomMove(move: CustomMove) {
    if (!isCustomMoveType(CustomMoveType.Pull)(move)) return []
    this.consumePower(2)
    this.pushEffect({
      effect: {
        type: EffectType.PullPawn,
        pawn: move.data,
        count: 1
      },
      sources: [{
        type: MaterialType.MonsterBoard,
        indexes: [this.material(MaterialType.MonsterBoard).id(this.player).getIndex()]
      }],
      target: this.player
    })
    return [this.startRule(RuleId.Effect)]
  }
}