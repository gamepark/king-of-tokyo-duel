import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { PowerCard } from '../material/cards/PowerCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { CustomMoveType } from './CustomMoveType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class RebootingRule extends BasePlayerTurnRule {
  onRuleStart() {
    return []
  }

  getPlayerMoves() {
    return [
      this.rebooting.moveItem({ type: LocationType.Discard }),
      this.customMove(CustomMoveType.Pass)
    ]
  }

  onCustomMove(move: CustomMove) {
    if (isCustomMoveType(CustomMoveType.Pass)(move)) {
      this.memorize(Memory.SkipReboot, true)
      return [this.startRule(RuleId.ResolveDice)]
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.PowerCard)(move) && move.location.type === LocationType.Discard) {
      const moves: MaterialMove[] = []
      const tokens = 2 - this.material(MaterialType.DiceToken).location(LocationType.PlayerDiceToken).player(this.player).getQuantity()
      if (tokens) {
        moves.push(this.material(MaterialType.DiceToken).location(LocationType.WhiteTokenStock).moveItem({
          type: LocationType.PlayerDiceToken,
          player: this.player
        }, tokens))
      }
      moves.push(this.material(MaterialType.Energy).createItem({ location: { type: LocationType.PlayerEnergy, player: this.player }, quantity: 2 }))
      moves.push(this.startRule(RuleId.Buy))
      return moves
    }
    return []
  }

  get rebooting() {
    return this
      .material(MaterialType.PowerCard)
      .id(PowerCard.Rebooting)
  }
}