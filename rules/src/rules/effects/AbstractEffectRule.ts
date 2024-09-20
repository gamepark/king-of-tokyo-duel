import { MaterialMove, MaterialRulesPart } from "@gamepark/rules-api";
import { Effect } from './EffectType'

export abstract class AbstractEffectRule extends MaterialRulesPart {

  abstract getMoves(effect: Effect): MaterialMove[];

  get player() {
    return this.game.rule!.player!
  }

  get rival() {
    return this.game.players.find((p) => p !== this.player)
  }
}