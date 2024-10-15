import { isMoveItem, ItemMove } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { Pawn } from '../material/Pawn'
import { BasePlayerTurnEffectRule } from './BasePlayerTurnEffectRule'
import { PullPawn } from './effects/EffectType'
import { KeepHelper } from './helper/KeepHelper'
import { RuleId } from './RuleId'

export class PullPawnRule extends BasePlayerTurnEffectRule<PullPawn> {
  onRuleStart() {
    const effectWSource = this.currentEffect
    const pawn = this.getPawn(effectWSource.effect.pawn)
    const isLeft = this.game.players[0] === this.currentEffect.target
    const item = pawn.getItem()!
    const nextX = isLeft ? item.location.x! - 1 : item.location.x! + 1
    // TODO: buzz with shortcut or extra step
    return [pawn.moveItem((item) => ({ ...item.location, x: nextX }))]
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItem(move) && move.itemType === MaterialType.Pawn) {
      if (this.isTriggeringEnd(move.location.x!)) {
        return [this.endGame()]
      } else {
        const effectWSource = this.currentEffect
        new KeepHelper(this.game).afterPullPawn(effectWSource.effect.pawn)
        return [this.startRule(RuleId.Effect)]
      }
    }
    return super.afterItemMove(move)
  }

  isTriggeringEnd(pawnX: number) {
    return Math.abs(pawnX) === 7
  }

  getPawn(pawn: Pawn) {
    return this.material(MaterialType.Pawn).id(pawn)
  }

  onRuleEnd() {
    const effectWSource = this.currentEffect
    if (effectWSource.effect.count === 1) {
      return super.onRuleEnd()
    } else {
      effectWSource.effect.count--
      return []
    }
  }
}