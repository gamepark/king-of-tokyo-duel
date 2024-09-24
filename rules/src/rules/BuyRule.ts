import { isMoveItemType, ItemMove, MaterialItem, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { energyCardCharacteristics } from '../material/cards/EnergyCardCharacteristics'
import { Timing } from '../material/cards/Timing'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class BuyRule extends PlayerTurnRule {
  onRuleStart() {
    if (!this.purchasableCards.length && !this.boughtCards.length) return this.gainEnergy()
    return []
  }

  getPlayerMoves() {
    return [
      ...this.purchasableCards
        .moveItems((item) => this.buyCard(item)),
      this.startRule(RuleId.ChangePlayer)
    ]
  }

  get purchasableCards() {
    return this.river
      .filter((item) => this.canBuyCard(item))
  }

  get boughtCards() {
    return this.remind(Memory.BoughtCards) ?? [ ]
  }

  gainEnergy() {
    return [
      this.material(MaterialType.Energy).createItem({
        location: {
          type: LocationType.PlayerEnergy,
          player: this.player
        },
        quantity: 1
      }),
      this.startRule(RuleId.ChangePlayer)
    ]
  }

  beforeItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.EnergyCard)(move) || move.location.type === LocationType.EnergyCardOnBoard) return []
    const item = this.material(MaterialType.EnergyCard).getItem(move.itemIndex)!
    return [
      this.energies.deleteItem(this.getCost(item)),
    ]
  }

  get energyCardDeck() {
    return this
      .material(MaterialType.EnergyCard)
      .location(LocationType.EnergyCardDeck)
      .deck()
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.EnergyCard)(move) || move.location.type === LocationType.EnergyCardOnBoard) return []
    const moves: MaterialMove[] = []
    const energyCardDeck = this.energyCardDeck
    this.memorizeBoughtCard(move.itemIndex)
    if (this.energyCardDeck.length) moves.push(energyCardDeck.dealOne({ type: LocationType.EnergyCardOnBoard }))
    if (!this.purchasableCards.length) moves.push(this.startRule(RuleId.ChangePlayer))
    return moves
  }

  canBuyCard(item: MaterialItem) {
    return this.getCost(item) <= this.energies.getQuantity()
  }

  getCost(item: MaterialItem) {
    if (item.location.x! === 0) return energyCardCharacteristics[item.id].cost - 1
    return energyCardCharacteristics[item.id].cost
  }

  buyCard(item: MaterialItem) {
    const characteristics = energyCardCharacteristics[item.id]
    if (characteristics.timing === Timing.Discard) {
      return {
        type: LocationType.Discard
      }
    }

    return {
      type: LocationType.PlayerKeepCards,
      player: this.player
    }
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
      .material(MaterialType.EnergyCard)
      .location(LocationType.EnergyCardOnBoard)
  }
}