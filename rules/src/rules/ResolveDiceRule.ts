import { MaterialMove } from '@gamepark/rules-api'
import { DiceFace } from '../material/DiceFace'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { GainEnergyRule } from './GainEnergyRule'
import { HealRule } from './HealRule'
import { Memory } from './Memory'
import { PullDestructionPawnRule } from './PullDestructionPawnRule'
import { PullFamePawnRule } from './PullFamePawnRule'
import { RuleId } from './RuleId'
import { SmashRule } from './SmashRule'

export class ResolveDiceRule extends BasePlayerTurnRule {
  onRuleStart() {
    if (!this.getPlayerMoves().length) return [this.startRule(RuleId.Buy)]
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (!this.isAlreadyConsumed(DiceFace.Energy) && new GainEnergyRule(this.game).countEnergy > 0) moves.push(this.startRule(RuleId.GainEnergy))
    if (!this.isAlreadyConsumed(DiceFace.Claw) && new SmashRule(this.game).countClaws > 0) moves.push(this.startRule(RuleId.Smash))
    if (!this.isAlreadyConsumed(DiceFace.Fame) && new PullFamePawnRule(this.game).countMoves > 0) moves.push(this.startRule(RuleId.PullFamePawn))
    if (!this.isAlreadyConsumed(DiceFace.Destruction) && new PullDestructionPawnRule(this.game).countMoves > 0) moves.push(this.startRule(RuleId.PullDestructionPawn))
    if (!this.isAlreadyConsumed(DiceFace.Heal) && new HealRule(this.game).countHeal > 0) moves.push(this.startRule(RuleId.Heal))
    // TODO
    // if (this.power) moves.push(this.startRule(RuleId.MonsterRule
    return moves
  }

  isAlreadyConsumed(face: DiceFace) {
    return (this.remind(Memory.DiceFacesSolved) ?? []).includes(face)
  }
}