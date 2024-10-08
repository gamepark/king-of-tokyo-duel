import { CustomMove, MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { Pawn } from '../material/Pawn'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { CustomMoveType } from './CustomMoveType'
import { PullFame } from './effects/EffectType'
import { KeepHelper } from './helper/KeepHelper'
import { RuleId } from './RuleId'

export class PullFamePawnRule extends BasePlayerTurnRule<PullFame> {
  onRuleStart() {
    const moves: MaterialMove[] = []
    moves.push(
      ...this.pull()
    )

    moves.push(this.startRule(RuleId.Effect))

    return moves
  }

  pull() {
    const pawn = this.getPawn(Pawn.Fame)
    const isLeft = this.game.players[0] === this.player
    const moves: MaterialMove[] = []
    const effectWSource = this.currentEffect
    const count = effectWSource.effect.count
    if (count) {
      const item = pawn.getItem()!
      const newX = isLeft ? Math.max(-7, item.location.x! - count) : Math.min(7, item.location.x! + count)

      if (item.location.x === newX) return []
      moves.push(
        this.customMove(CustomMoveType.PullPawn, effectWSource)
      )
    }

    return moves
  }

  onCustomMove(_move: CustomMove) {
    const effectWSource = this.currentEffect
    const pawn = this.getPawn(Pawn.Fame)
    const isLeft = this.game.players[0] === this.player
    const count = effectWSource.effect.count
    if (count) {
      const item = pawn.getItem()!
      const newX = isLeft ? Math.max(-7, item.location.x! - count) : Math.min(7, item.location.x! + count)

      if (item.location.x === newX) return []
      const moves: MaterialMove[] = []
      moves.push(
        pawn
          .moveItem((item) => ({ ...item.location, x: newX }))
      )

      if (Math.abs(newX) === 7) {
        moves.push(this.endGame())
        return moves
      }

      new KeepHelper(this.game).afterPawnMoved(Pawn.Fame, count)

      return moves
    }

    return []

  }

  getPawn(pawn: Pawn) {
    return this.material(MaterialType.Pawn).id(pawn)
  }

  onRuleEnd() {
    this.sliceEffect()
    return []
  }
}