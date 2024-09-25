import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { DiceColor } from '../material/DiceColor'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { RuleId } from './RuleId'

export class DominateRule extends PlayerTurnRule {

  getPlayerMoves() {
    return [
      ...this.keepCards.moveItems({
        type: LocationType.Discard
      }),
      this.customMove(CustomMoveType.Dominated)
    ]
  }

  onCustomMove(move: CustomMove) {
    if (!isCustomMoveType(CustomMoveType.Dominated)(move)) return []
    const rival = this.rival
    return [
      this.redDice.moveItem({
        type: LocationType.PlayerHand,
        player: rival
      }),
      this.startPlayerTurn(RuleId.RollDice, rival)
    ]
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.EnergyCard)(move)) return []
    return [this.startPlayerTurn(RuleId.RollDice, this.rival)]
  }

  get rival() {
    return this.game.players.find((p) => p !== this.player)!
  }

  get keepCards() {
    return this
      .material(MaterialType.EnergyCard)
      .location(LocationType.PlayerKeepCards)
      .player(this.player)
  }

  get redDice() {
    return this
      .material(MaterialType.Dice)
      .id(DiceColor.Red)
      .location(LocationType.PlayerHand)
      .player(this.player)
      .maxBy((item) => item.location.x!)
  }
}