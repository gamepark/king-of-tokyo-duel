import { CustomMove, MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { Pawn } from '../material/Pawn'
import { BasePlayerTurnEffectRule } from './BasePlayerTurnEffectRule'
import { CustomMoveType } from './CustomMoveType'
import { PullPawn } from './effects/EffectType'
import { KeepHelper } from './helper/KeepHelper'
import { RuleId } from './RuleId'

export class PullPawnRule extends BasePlayerTurnEffectRule<PullPawn> {
  onRuleStart() {
    return [
      this.customMove(CustomMoveType.PullPawn, this.currentEffect)
    ]
  }

  onCustomMove(_move: CustomMove) {
    const effectWSource = this.currentEffect
    const pawn = this.getPawn(effectWSource.effect.pawn)
    const isLeft = this.game.players[0] === this.currentEffect.target
    const count = effectWSource.effect.count
    const item = pawn.getItem()!
    console.log(effectWSource.effect.pawn)
    const newX = isLeft ? Math.max(-7, item.location.x! - count) : Math.min(7, item.location.x! + count)

    if (item.location.x === newX) return []
    const moves: MaterialMove[] = []
    moves.push(
      pawn.moveItem((item) => ({ ...item.location, x: newX }))
    )

    if (this.isTriggeringEnd(newX)) {
      moves.push(this.endGame())
      return moves
    }

    new KeepHelper(this.game).afterPullPawn(effectWSource.effect.pawn, count)
    moves.push(this.startRule(RuleId.Effect))

    return moves
  }

  isTriggeringEnd(pawnX: number) {
    return Math.abs(pawnX) === 7
  }

  getPawn(pawn: Pawn) {
    return this.material(MaterialType.Pawn).id(pawn)
  }
}