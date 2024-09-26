import { MaterialMove, MaterialRulesPart } from "@gamepark/rules-api";
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'
import { Effect, EffectType } from './EffectType'

export abstract class AbstractEffectRule<E extends Effect = { type: EffectType }> extends MaterialRulesPart {

  abstract getMoves(_effect: E): MaterialMove[];

  get player() {
    return this.game.rule!.player!
  }

  get rival() {
    return this.game.players.find((p) => p !== this.player)!
  }

  get effect(): E & { cardIndex: number } {
    return this.remind(Memory.Effects)[0]!
  }

  get cardIndex() {
    return this.effect.cardIndex
  }

  get rivalKeepCards() {
    return this
      .material(MaterialType.PowerCard)
      .location(LocationType.PlayerKeepCards)
      .player(this.rival)
  }

  get playerKeepCards() {
    return this
      .material(MaterialType.PowerCard)
      .location(LocationType.PlayerKeepCards)
      .player(this.player)
  }
}