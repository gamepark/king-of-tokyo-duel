import { MaterialItem, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { BuyRule } from '../../BuyRule'
import { RuleId } from '../../RuleId'
import { KeepRule } from '../KeepRule'

export class MadeInALabKeepRule extends KeepRule {
  atStartOfTurn(): MaterialMove[] {
    if (this.getActivePlayer() !== this.cardPlayer || this.isConsumed) return []
    if (!this.getPurchasableCards().length) return []
    return [this.startRule(RuleId.MadeInALab)]
  }

  onBuyPowerCard() {
    if (this.game.rule?.id !== RuleId.MadeInALab) return
    this.markKeepCardConsumed()
  }

  getPurchasableCards(energy: number = this.energies.getQuantity()) {
    return this.river
      .filter((item) => this.canBuyCard(item, energy))
  }

  canBuyCard(item: MaterialItem, energy: number) {
    return this.getCost(item) <= energy
  }

  getCost(item: MaterialItem) {
    return Math.max(new BuyRule(this.game).getCost(item) - 1, 0)
  }

  get energies() {
    return this
      .material(MaterialType.Energy)
      .location(LocationType.PlayerEnergy)
      .player(this.cardPlayer)
  }

  get river() {
    return this
      .material(MaterialType.PowerCard)
      .location(LocationType.PowerCardOnBoard)
  }
}