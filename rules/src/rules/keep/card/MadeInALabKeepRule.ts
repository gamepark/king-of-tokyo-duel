import { MaterialItem, MaterialMove } from '@gamepark/rules-api'
import { PowerCard } from '../../../material/cards/PowerCard'
import { powerCardCharacteristics } from '../../../material/cards/PowerCardCharacteristics'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
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
    if (item.location.x! === 0) return Math.max(powerCardCharacteristics[item.id as PowerCard].cost - 2, 0)
    return Math.max(powerCardCharacteristics[item.id as PowerCard].cost - 1, 0)
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