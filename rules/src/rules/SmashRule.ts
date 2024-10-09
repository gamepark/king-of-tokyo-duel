import { CustomMove, isCustomMoveType, MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnEffectRule } from './BasePlayerTurnEffectRule'
import { CustomMoveType } from './CustomMoveType'
import { Smash } from './effects/EffectType'
import { KeepHelper } from './helper/KeepHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class SmashRule extends BasePlayerTurnEffectRule<Smash> {
  onRuleStart() {
    const smash = this.currentEffect
    return [this.customMove(CustomMoveType.Smash, smash)]
  }

  onCustomMove(move: CustomMove) {
    if (!isCustomMoveType(CustomMoveType.Smash)(move)) return []
    const damages = this.currentEffect.effect.count
    const target = this.currentEffect.target
    const wheel = this.wheel
    const newHealth = Math.max(wheel.getItem()!.location.rotation - damages, 0)
    const moves: MaterialMove[] = [
      wheel.rotateItem(newHealth)
    ]

    new KeepHelper(this.game).afterSmashTakenComputed(target)
    if (!newHealth) {
      const onDieMoves = new KeepHelper(this.game).onDie(target)
      moves.push(...onDieMoves)

      if (this.remind(Memory.Immune) !== target) {
        moves.push(this.endGame())
        return moves
      }
    }
    moves.push(this.startRule(RuleId.Effect))
    return moves
  }

  get wheel() {
    return this
      .material(MaterialType.HealthCounter)
      .player(this.currentEffect.target)
  }

}