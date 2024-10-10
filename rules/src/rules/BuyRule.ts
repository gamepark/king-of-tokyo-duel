import { CustomMove, isCreateItemType, isCustomMoveType, isMoveItemType, ItemMove, MaterialItem, MaterialMove, MoveItem, RuleMove } from '@gamepark/rules-api'
import { powerCardCharacteristics } from '../material/cards/PowerCardCharacteristics'
import { Timing } from '../material/cards/Timing'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { CustomMoveType } from './CustomMoveType'
import { EffectType } from './effects/EffectType'
import { KeepHelper } from './helper/KeepHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class BuyRule extends BasePlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(...this.placeCard())
    this.memorize(Memory.Phase, RuleId.Buy)
    if (!this.getPurchasableCards().length) {
      if (this.boughtCards.length) {
        moves.push(this.getNextRule())
        return moves
      }

      moves.push(this.customMove(CustomMoveType.Pass))
      return moves
    }

    return moves
  }

  placeCard() {
    const boughtCard = this
      .material(MaterialType.PowerCard)
      .location(LocationType.BuyArea)

    if (boughtCard.length) {
      return boughtCard
        .moveItems((item) => {
          if (powerCardCharacteristics[item.id].timing === Timing.Discard) {
            return {
              type: LocationType.Discard
            }
          } else {
            return {
              type: LocationType.PlayerKeepCards,
              player: this.player
            }
          }
        })
    }

    return []

  }

  getNextRule(): RuleMove {
    if (this.effects.length) {
      return this.startRule(RuleId.Effect)
    }
    return this.startRule(RuleId.EndOfTurn)
  }

  getPlayerMoves() {
    const moves: MaterialMove[] = super.getPlayerMoves()
    moves.push(this.customMove(CustomMoveType.Pass))

    moves.push(
      ...this.getPurchasableCards()
        .moveItems({
          type: LocationType.BuyArea,
          player: this.player
        })
    )

    return moves
  }

  get boughtCards() {
    return this.remind(Memory.BoughtCards) ?? []
  }

  afterItemMove(move: ItemMove) {
    const moves: MaterialMove[] = super.afterItemMove(move)
    if (isMoveItemType(MaterialType.PowerCard)(move) && move.location.type === LocationType.BuyArea) {
      this.memorizeBoughtCard(move.itemIndex)
      const item = this.material(MaterialType.PowerCard).getItem(move.itemIndex)!
      const buzz = powerCardCharacteristics[item.id].buzz


      this.addDiscardEffect(move)
      if (buzz) {
        moves.push(this.startRule(RuleId.MoveBuzzToken))
        return moves
      }

      if (this.effects.length) {
        moves.push(this.startRule(RuleId.Effect))
        return moves
      }

      moves.push(...this.placeCard())
      if (!this.getPurchasableCards(this.energies.getQuantity() - this.getCost(item)).length) {
        moves.push(this.getNextRule())
      }
    }

    if (isCreateItemType(MaterialType.Energy)(move)) {
      moves.push(this.getNextRule())
    }

    return moves
  }

  addDiscardEffect(move: MoveItem) {
    const item = this.material(MaterialType.PowerCard).getItem(move.itemIndex)!
    const effects = powerCardCharacteristics[item.id].effects ?? []

    if (effects.length) {
      for (const effect of effects) {
        this.pushEffect({
          effect: effect,
          sources: [{
            type: MaterialType.PowerCard,
            indexes: [move.itemIndex]
          }],
          target: effect?.rival ? this.rival : this.player
        })
      }
    }
  }

  beforeItemMove(move: ItemMove) {
    const moves: MaterialMove[] = super.beforeItemMove(move)
    if (isMoveItemType(MaterialType.PowerCard)(move) && move.location.type === LocationType.BuyArea) {
      const item = this.material(MaterialType.PowerCard).getItem(move.itemIndex)!
      new KeepHelper(this.game).onBuyPowerCard()
      moves.push(this.energies.deleteItem(this.getCost(item)))
      return moves
    }

    return moves
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (!isCustomMoveType(CustomMoveType.Pass)(move)) return []
    this.memorize(Memory.Phase, RuleId.EndOfTurn)
    if (this.boughtCards.length) return [this.getNextRule()]
    this.pushEffect({
      effect: {
        type: EffectType.GainEnergy,
        count: 1
      },
      sources: [],
      target: this.player
    })

    return [this.getNextRule()]
  }

  getPurchasableCards(energy: number = this.energies.getQuantity()) {
    return this.river
      .filter((item) => this.canBuyCard(item, energy))
  }

  canBuyCard(item: MaterialItem, energy: number) {
    return this.getCost(item) <= energy
  }

  getCost(item: MaterialItem) {
    if (item.location.x! === 0) return Math.max(powerCardCharacteristics[item.id].cost - 1, 1)
    return Math.max(powerCardCharacteristics[item.id].cost, 1)
  }

  memorizeBoughtCard(index: number) {
    this.memorize(Memory.BoughtCards, (cards: number[]) => {
      if (!cards) {
        return [index]
      }

      cards.push(index)
      return cards
    })
  }

  get energies() {
    return this
      .material(MaterialType.Energy)
      .location(LocationType.PlayerEnergy)
      .player(this.player)
  }

  get river() {
    return this
      .material(MaterialType.PowerCard)
      .location(LocationType.PowerCardOnBoard)
  }
}