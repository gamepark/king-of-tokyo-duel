import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { KeepRule } from '../KeepRule'

export class AlienMetabolismKeepRule extends KeepRule {
  get allowedMovesDuringTurn(): MaterialMove[] {
    if (this.getActivePlayer() !== this.cardPlayer) return []
    return this.powerCardOnBoard.moveItems({
      type: LocationType.Discard
    })
  }

  beforeItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.PowerCard)(move) || move.location.type !== LocationType.Discard) return []
    const item = this.material(MaterialType.PowerCard).getItem(move.itemIndex)
    if (item?.location.type !== LocationType.OnPowerCard) return []
    this.markKeepCardConsumed()
    return []
  }

  get powerCardDeck() {
    return this
      .material(MaterialType.PowerCard)
      .location(LocationType.PowerCardDeck)
      .deck()
  }

  get powerCardOnBoard() {
    return this
      .material(MaterialType.PowerCard)
      .location(LocationType.PowerCardOnBoard)
  }
}