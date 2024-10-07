import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { KeepRule } from '../KeepRule'

export class AlienMetabolismKeepRule extends KeepRule {
  get allowedMovesDuringTurn(): MaterialMove[] {
    /*if (this.getActivePlayer() !== this.cardPlayer) return []
    return this.powerCardOnBoard.moveItems({
      type: LocationType.Discard
    })*/
    return []
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.PowerCard)(move) || move.location.type !== LocationType.Discard) return []
    this.markKeepCardConsumed()
    return []
  }

  get powerCardOnBoard() {
    return this
      .material(MaterialType.PowerCard)
      .location(LocationType.PowerCardOnBoard)
  }
}