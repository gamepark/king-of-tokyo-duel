import { CustomMove, isCreateItemType, isCustomMoveType, isMoveItemType, ItemMove, MaterialItem, MaterialMove, MoveItem, RuleMove } from '@gamepark/rules-api'
import { powerCardCharacteristics } from '../material/cards/PowerCardCharacteristics'
import { Timing } from '../material/cards/Timing'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { CustomMoveType } from './CustomMoveType'
import { EnergyHelper } from './helper/EnergyHelper'
import { KeepHelper } from './helper/KeepHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class BuyRule extends BasePlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    this.memorize(Memory.Phase, RuleId.Buy)
    if (!this.getPurchasableCards().length) {
      if (this.boughtCards.length) {
        return [this.startRule(RuleId.EndOfTurn)]
      }

      return [this.customMove(CustomMoveType.Pass)]
    }

    return []
  }

  getNextRule(): RuleMove {
    return this.startRule(RuleId.EndOfTurn)
  }

  getPlayerMoves() {
    const moves: MaterialMove[] = []
    moves.push(this.customMove(CustomMoveType.Pass))

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

  afterItemMove(move: ItemMove) {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.PowerCard)(move) && move.location.type !== LocationType.PowerCardOnBoard) {
      this.memorizeBoughtCard(move.itemIndex)

      const powerCardDeck = this.powerCardDeck
      if (this.powerCardDeck.length) moves.push(powerCardDeck.dealOne({ type: LocationType.PowerCardOnBoard }))

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
        console.log({
          effect: effect,
          sources: [{
            type: MaterialType.PowerCard,
            indexes: [move.itemIndex]
          }],
          target: effect?.me? this.player: this.rival
        })
        this.unshiftEffect({
          effect: effect,
          sources: [{
            type: MaterialType.PowerCard,
            indexes: [move.itemIndex]
          }],
          target: effect?.me? this.player: this.rival
        })
      }
    }
  }

  beforeItemMove(move: ItemMove) {
    const moves: MaterialMove[] = []
    if (!isMoveItemType(MaterialType.PowerCard)(move) || move.location.type === LocationType.PowerCardOnBoard) return moves
    const item = this.material(MaterialType.PowerCard).getItem(move.itemIndex)!
    new KeepHelper(this.game).onBuyPowerCard()
    moves.push(this.energies.deleteItem(this.getCost(item)))
    return moves
  }

  onCustomMove(move: CustomMove) {
    const moves: MaterialMove[] = []
    if (!isCustomMoveType(CustomMoveType.Pass)(move)) return moves
    if (this.boughtCards.length) return [this.getNextRule()]
    moves.push(...new EnergyHelper(this.game, this.player).gain(1))
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