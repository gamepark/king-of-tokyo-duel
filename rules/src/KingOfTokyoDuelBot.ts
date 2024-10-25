import { isMoveItem, MaterialGame, MaterialMove, RandomBot } from '@gamepark/rules-api'
import { KingOfTokyoDuelRules } from './KingOfTokyoDuelRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { Monster } from './material/Monster'

export class KingOfTokyoDuelBot extends RandomBot<MaterialGame<Monster, MaterialType, LocationType>, MaterialMove<Monster, MaterialType, LocationType>, Monster> {

  constructor(playerId: Monster) {
    super(KingOfTokyoDuelRules, playerId)
  }

  isUndoSelectDiceToReroll(move: MaterialMove<Monster, MaterialType, LocationType>) {
    return isMoveItem(move) && move.itemType === MaterialType.Dice && move.location.type === LocationType.PlayerDiceKeep
  }

  override getLegalMoves(game: MaterialGame<Monster, MaterialType, LocationType>): MaterialMove<Monster, MaterialType, LocationType>[] {
    return super.getLegalMoves(game).filter(move => !(this.isUndoSelectDiceToReroll(move)))
  }
}
