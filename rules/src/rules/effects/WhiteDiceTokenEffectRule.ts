import { AbstractEffectRule } from './AbstractEffectRule'
import { WhiteDiceToken } from './EffectType'

export class WhiteDiceTokenEffectRule extends AbstractEffectRule<WhiteDiceToken> {
  getMoves(_effect: WhiteDiceToken) {
    return []
  }
}