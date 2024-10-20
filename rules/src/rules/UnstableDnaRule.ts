import { CustomMove, isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { PowerCard } from '../material/cards/PowerCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Monster } from '../material/Monster'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { CustomMoveType } from './CustomMoveType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class UnstableDnaRule extends BasePlayerTurnRule {
  getPlayerMoves(): MaterialMove[] {
    return [
      ...this.rivalKeepCards.moveItems({ type: LocationType.PlayerKeepCards, player: this.player }),
      this.customMove(CustomMoveType.Pass)
    ]
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.PowerCard)(move) && move.location.type === LocationType.PlayerKeepCards) {
      if (move.location.player === this.player) {
        return [this.unstableDna.moveItem({
          type: LocationType.PlayerKeepCards,
          player: this.rival
        })]
      } else {
        return [this.nextRule]
      }
    }
    return []
  }

  onCustomMove(move: CustomMove) {
    return move.type === CustomMoveType.Pass ? [this.nextRule] : []
  }

  get nextRule() {
    const activePlayer = this.remind<Monster>(Memory.ActivePlayer)
    if (this.player !== activePlayer) {
      return this.startPlayerTurn(RuleId.Effect, activePlayer)
    } else {
      return this.startRule(RuleId.Effect)
    }
  }

  get unstableDna() {
    return this.material(MaterialType.PowerCard)
      .id(PowerCard.UnstableDna)
  }

  get rivalKeepCards() {
    return this
      .material(MaterialType.PowerCard)
      .location(LocationType.PlayerKeepCards)
      .player(this.rival)
  }
}