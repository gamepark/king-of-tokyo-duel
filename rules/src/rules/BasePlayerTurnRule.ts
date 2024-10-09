import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule, RuleMove } from '@gamepark/rules-api'
import { DiceFace } from '../material/DiceFace'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Effect } from './effects/EffectType'
import { EffectWithSource } from './effects/EffectWithSource'
import { KeepHelper } from './helper/KeepHelper'
import { Memory } from './Memory'

export class BasePlayerTurnRule<E extends Effect = any> extends PlayerTurnRule {
  getNextRule?(): RuleMove

  get rival() {
    return this.game.players.find((p) => p !== this.player)!
  }

  getPlayerMoves(): MaterialMove<number, number, number>[] {
    return new KeepHelper(this.game).allowedMovesDuringTurn
  }

  beforeItemMove(move: ItemMove): MaterialMove<number, number, number>[] {
    return new KeepHelper(this.game).beforeItemMove(move)
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.PowerCard)(move)) return []
    const moves: MaterialMove[] = []
    if (this.cardOnBoard.length < 3) {
      const powerCardDeck = this.powerCardDeck
      if (this.powerCardDeck.length) moves.push(powerCardDeck.dealOne({ type: LocationType.PowerCardOnBoard }))
    }
    return moves
  }

  get powerCardDeck() {
    return this
      .material(MaterialType.PowerCard)
      .location(LocationType.PowerCardDeck)
      .deck()
  }

  get cardOnBoard() {
    return this.material(MaterialType.PowerCard).location(LocationType.PowerCardOnBoard)
  }

  isAlreadyConsumed(face: DiceFace) {
    return (this.remind(Memory.DiceFacesSolved) ?? []).includes(face)
  }

  get effects(): EffectWithSource[] {
    return this.remind<EffectWithSource[]>(Memory.Effects) ?? []
  }

  get currentEffect(): EffectWithSource<E> {
    return this.effects[0]!
  }

  addEffect(effectWithSource: EffectWithSource) {
    this.memorize(Memory.Effects, (effects: EffectWithSource[] = []) => {
      effects.push(effectWithSource)
      return effects
    })
  }


  unshiftEffect(effect:EffectWithSource) {
    this.memorize(Memory.Effects, (effects: EffectWithSource[] = []) => {
      effects.unshift(effect)
      return effects
    })
  }

  pushEffect(effect: EffectWithSource) {
    this.memorize(Memory.Effects, (effects: EffectWithSource[] = []) => {
      effects.push(effect)
      return effects
    })
  }
}