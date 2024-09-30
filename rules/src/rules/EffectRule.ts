import { MaterialGame } from '@gamepark/rules-api'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { AbstractEffectRule } from './effects/AbstractEffectRule'
import { DominateEffectRule } from './effects/DominateEffectRule'
import { Effect, EffectType } from './effects/EffectType'
import { FreeTurnEffectRule } from './effects/FreeTurnEffectRule'
import { GainEnergyEffectRule } from './effects/GainEnergyEffectRule'
import { HealEffectRule } from './effects/HealEffectRule'
import { OperationMediaEffectRule } from './effects/OperationMediaEffectRule'
import { PullDestructionEffectRule } from './effects/PullDestructionEffectRule'
import { PullFameEffectRule } from './effects/PullFameEffectRule'
import { SmashEffectRule } from './effects/SmashEffectRule'
import { TeslaImpulseEffectRule } from './effects/TeslaImpulseEffectRule'
import { ThePartyIsOverEffectRule } from './effects/ThePartyIsOverEffectRule'
import { WhiteDiceTokenEffectRule } from './effects/WhiteDiceTokenEffectRule'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class EffectRule extends BasePlayerTurnRule {
  onRuleStart() {
    const effects = this.effects
    if (!effects.length) return this.getNextRuleMove()
    const effect = this.effect
    const moves = getEffectRule(this.game, effect).getMoves(effect)

    if (effects.length > 1) {
      moves.push(this.startRule(RuleId.Effect))
    } else {
      moves.push(...this.getNextRuleMove())
    }

    return moves
  }

  getNextRule() {
    return this.startRule(RuleId.Buy)
  }

  get effect() {
    return this.effects[0]!
  }

  get effects() {
    return this.remind<Effect[]>(Memory.Effects) ?? []
  }

  onRuleEnd() {
    this.memorize(Memory.Effects, (effects: Effect[]) => effects.slice(1))
    return []
  }
}

export const getEffectRule = (game: MaterialGame, effect: Effect): AbstractEffectRule => {
  switch (effect.type) {
    case EffectType.FreeTurn:
      return new FreeTurnEffectRule(game)
    case EffectType.PullFame:
      return new PullFameEffectRule(game)
    case EffectType.PullDestruction:
      return new PullDestructionEffectRule(game)
    case EffectType.Heal:
      return new HealEffectRule(game)
    case EffectType.Smash:
      return new SmashEffectRule(game)
    case EffectType.GainEnergy:
      return new GainEnergyEffectRule(game)
    case EffectType.WhiteDiceToken:
      return new WhiteDiceTokenEffectRule(game)
    case EffectType.ThePartyIsOver:
      return new ThePartyIsOverEffectRule(game);
    case EffectType.TeslaImpulse:
      return new TeslaImpulseEffectRule(game);
    case EffectType.OperationMedia:
      return new OperationMediaEffectRule(game);
    case EffectType.Dominate:
      return new DominateEffectRule(game)

  }
}