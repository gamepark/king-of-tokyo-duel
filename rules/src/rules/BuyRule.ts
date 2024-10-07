import { CustomMove, isCreateItemType, isCustomMoveType, isMoveItemType, ItemMove, MaterialItem, MaterialMove, RuleMove } from '@gamepark/rules-api'
import { powerCardCharacteristics } from '../material/cards/PowerCardCharacteristics'
import { Timing } from '../material/cards/Timing'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { CustomMoveType } from './CustomMoveType'
import { EffectHelper } from './helper/EffectHelper'
import { EnergyHelper } from './helper/EnergyHelper'
import { KeepHelper } from './helper/KeepHelper'
import { isChangingRule } from './IsChangingRule'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class BuyRule extends BasePlayerTurnRule {
  onRuleStart(_move: RuleMove): MaterialMove[] {
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
    const moves: MaterialMove[] = super.getPlayerMoves()
    if (!this.boughtCards.length) moves.push(this.customMove(CustomMoveType.Pass))

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

  beforeItemMove(move: ItemMove) {
    const moves = super.beforeItemMove(move)
    if (moves.some(isChangingRule)) return moves
    if (!isMoveItemType(MaterialType.PowerCard)(move) || move.location.type === LocationType.PowerCardOnBoard) return moves
    const item = this.material(MaterialType.PowerCard).getItem(move.itemIndex)!
    moves.push(this.energies.deleteItem(this.getCost(item)))
    return moves
  }

  onCustomMove(move: CustomMove) {
    const moves = super.onCustomMove(move)
    if (moves.some(isChangingRule)) return moves
    if (!isCustomMoveType(CustomMoveType.Pass)(move)) return moves
    moves.push(...new EnergyHelper(this.game, this.player).gain(1))
    return moves
  }

  afterItemMove(move: ItemMove) {
    const moves: MaterialMove[] = super.afterItemMove(move)
    if (moves.some(isChangingRule)) return moves
    if (isMoveItemType(MaterialType.PowerCard)(move) && move.location.type !== LocationType.PowerCardOnBoard) {
      this.memorizeBoughtCard(move.itemIndex)

      const item = this.material(MaterialType.PowerCard).getItem(move.itemIndex)!
      const buzz = powerCardCharacteristics[item.id].buzz

      moves.push(...new KeepHelper(this.game).onBuyPowerCard())
      if (isChangingRule(move)) return moves

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
        moves.push(this.getNextRule())
      }
    }

    if (isCreateItemType(MaterialType.Energy)(move)) {
      moves.push(this.getNextRule())
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