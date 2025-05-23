import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialItem, MaterialMove, MoveItem, RuleMove } from '@gamepark/rules-api'
import { PowerCard } from '../material/cards/PowerCard'
import { powerCardCharacteristics } from '../material/cards/PowerCardCharacteristics'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { CustomMoveType } from './CustomMoveType'
import { EffectType } from './effects/EffectType'
import { KeepHelper } from './helper/KeepHelper'
import { BuyCardHelper } from './helper/BuyCardHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class BuyRule extends BasePlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(...new BuyCardHelper(this.game, this.player).placeBoughtCard())
    this.memorize(Memory.Phase, RuleId.Buy)
    return moves
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
    if (this.canRenewCards) {
      moves.push(this.customMove(CustomMoveType.RenewCards))
    }

    moves.push(
      ...this.getPurchasableCards()
        .moveItems({
          type: LocationType.BuyArea,
          player: this.player
        })
    )

    return moves
  }

  get canRenewCards() {
    return !this.remind(Memory.RefillRiver) && this.energies.getQuantity() >= 2
  }

  get boughtCards() {
    return this.remind(Memory.BoughtCards) ?? []
  }

  afterItemMove(move: ItemMove) {
    const moves: MaterialMove[] = super.afterItemMove(move)
    if (isMoveItemType(MaterialType.PowerCard)(move) && move.location.type === LocationType.BuyArea) {
      this.memorizeBoughtCard(move.itemIndex)
      const item = this.material(MaterialType.PowerCard).getItem<PowerCard>(move.itemIndex)!
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

      moves.push(...new BuyCardHelper(this.game, this.player).placeBoughtCard())
    }

    return moves
  }

  addDiscardEffect(move: MoveItem) {
    const item = this.material(MaterialType.PowerCard).getItem<PowerCard>(move.itemIndex)!
    const effects = powerCardCharacteristics[item.id].effects ?? []

    if (effects.length) {
      for (const effect of effects) {
        this.pushEffect({
          effect: effect,
          sources: [{
            type: MaterialType.PowerCard,
            indexes: [move.itemIndex],
            count: effect.count ?? 0
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
      const cost = this.getCost(item)
      if (cost > 0) {
        moves.push(this.energies.deleteItem(cost))
      }
      return moves
    }

    return moves
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.RenewCards)(move)) {
      this.memorize(Memory.RefillRiver, true)
      return [
        this.energies.deleteItem(2),
        this.river.moveItemsAtOnce({
          type: LocationType.Discard
        })
      ]
    }

    if (isCustomMoveType(CustomMoveType.Pass)(move)) {
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

    return []
  }

  getPurchasableCards(energy: number = this.energies.getQuantity()) {
    return this.river
      .filter((item) => this.canBuyCard(item, energy))
  }

  canBuyCard(item: MaterialItem, energy: number) {
    return this.getCost(item) <= energy
  }

  getCost(item: MaterialItem) {
    const cost = powerCardCharacteristics[item.id as PowerCard].cost
    return item.location.x! === 0 ? cost - 1 : cost
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
