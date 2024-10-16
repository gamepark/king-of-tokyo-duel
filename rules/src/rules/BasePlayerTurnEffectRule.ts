import { CustomMove } from '@gamepark/rules-api/dist/material/moves/CustomMove'
import { ItemMove } from '@gamepark/rules-api/dist/material/moves/items/ItemMove'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { Effect } from './effects/EffectType'
import { KeepHelper } from './helper/KeepHelper'

export class BasePlayerTurnEffectRule<E extends Effect = any> extends BasePlayerTurnRule<E> {
  onRuleEnd() {
    this.removeEffect()
    return []
  }

  afterItemMove(move: ItemMove) {
    new KeepHelper(this.game).afterItemMove(move)
    return super.afterItemMove(move)
  }

  onCustomMove(move: CustomMove) {
    new KeepHelper(this.game).onCustomMove(move)
    return super.onCustomMove(move)
  }
}