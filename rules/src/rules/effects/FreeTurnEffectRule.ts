import { Memory } from '../Memory'
import { AbstractEffectRule } from './AbstractEffectRule'

export class FreeTurnEffectRule extends AbstractEffectRule {
  getMoves() {
    this.memorize(Memory.FreeTurn, true)
    return []
  }
}