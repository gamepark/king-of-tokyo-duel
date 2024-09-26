import { isCreateItemType, isMoveItemType, ItemMove, MaterialItem, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { powerCardCharacteristics } from '../material/cards/PowerCardCharacteristics'
import { Timing } from '../material/cards/Timing'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { EffectHelper } from './helper/EffectHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class BuyRule extends PlayerTurnRule {
  onRuleStart() {
    if (!this.getPurchasableCards().length) {
      if (this.boughtCards.length) {
        return [this.startRule(RuleId.ChangePlayer)]
      }

      return this.gainEnergy()
    }

    return []
  }

  getPlayerMoves() {
    const moves: MaterialMove[] = []
    if (!this.boughtCards.length) moves.push(...this.gainEnergy())

    moves.push(
      ...this.getPurchasableCards()
        .moveItems((item) => this.buyCard(item))
    )

    return moves
  }

  getPurchasableCards(energy: number = this.energies.getQuantity()) {
    return this.river
      .filter((item) => this.canBuyCard(item, energy))
  }

  get boughtCards() {
    return this.remind(Memory.BoughtCards) ?? []
  }

  gainEnergy() {
    return [
      this.material(MaterialType.Energy).createItem({
        location: {
          type: LocationType.PlayerEnergy,
          player: this.player
        },
        quantity: 1
      })
    ]
  }

  beforeItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.PowerCard)(move) || move.location.type === LocationType.PowerCardOnBoard) return []
    const item = this.material(MaterialType.PowerCard).getItem(move.itemIndex)!
    return [
      this.energies.deleteItem(this.getCost(item))
    ]
  }

  get powerCardDeck() {
    return this
      .material(MaterialType.PowerCard)
      .location(LocationType.PowerCardDeck)
      .deck()
  }

  afterItemMove(move: ItemMove) {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.PowerCard)(move) && move.location.type !== LocationType.PowerCardOnBoard) {
      const powerCardDeck = this.powerCardDeck
      this.memorizeBoughtCard(move.itemIndex)
      if (this.powerCardDeck.length) moves.push(powerCardDeck.dealOne({ type: LocationType.PowerCardOnBoard }))

      const item = this.material(MaterialType.PowerCard).getItem(move.itemIndex)!
      const buzz = powerCardCharacteristics[item.id].buzz

      // If the player
      if (buzz) {
        moves.push(this.startRule(RuleId.MoveBuzzToken))
        return moves
      }

      const effects = new EffectHelper(this.game, this.player).applyEffectMoves()
      if (effects.length) {
        moves.push(...effects)
        return moves
      }

      if (!this.getPurchasableCards(this.energies.getQuantity() - this.getCost(item)).length) {
        moves.push(this.startRule(RuleId.ChangePlayer))
      }
    }

    if (isCreateItemType(MaterialType.Energy)(move)) {
      moves.push(this.startRule(RuleId.ChangePlayer))
    }

    return moves
  }

  canBuyCard(item: MaterialItem, energy: number) {
    return this.getCost(item) <= energy
  }

  getCost(item: MaterialItem) {
    if (item.location.x! === 0) return powerCardCharacteristics[item.id].cost - 1
    return powerCardCharacteristics[item.id].cost
  }

  buyCard(item: MaterialItem) {
    const characteristics = powerCardCharacteristics[item.id]
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
      .material(MaterialType.PowerCard)
      .location(LocationType.PowerCardOnBoard)
  }
}