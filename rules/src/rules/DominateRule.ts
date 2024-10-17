import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { PowerCard } from '../material/cards/PowerCard'
import { DiceColor } from '../material/DiceColor'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { CustomMoveType } from './CustomMoveType'
import { Memory, SetDiceOn } from './Memory'
import { RuleId } from './RuleId'

export class DominateRule extends BasePlayerTurnRule {
  onRuleStart() {
    this.removeEffect()
    return []
  }

  getPlayerMoves() {
    const moves = super.getPlayerMoves()
    if (!this.keepCards.length) return [this.startRule(RuleId.RollDice)]

    moves.push(
      ...this.keepCards.moveItems({
        type: LocationType.Discard
      }))

    moves.push(this.customMove(CustomMoveType.Dominated))
    return moves
  }

  onCustomMove(move: CustomMove) {
    if (!isCustomMoveType(CustomMoveType.Dominated)(move)) return []
    const diceToSetApart = this.remind<SetDiceOn[]>(Memory.SetDiceApart) ?? []
    const redDice = this.redDice.deck()
    const moves: MaterialMove[] = []
    for (let i = 0; i < diceToSetApart.length; i++) {
      const infos = diceToSetApart[i]
      if(moves.length === 6) break
      moves.push(
        redDice
          .moveItem({
            type: infos.location,
            parent: infos.parent
          })
      )
    }

    for (let i = 0; i < this.keepCards.length; i++) {
      if(moves.length === 6) break
      moves.push(
        redDice
          .dealOne({
            type: LocationType.OnPowerCard,
            parent: this.material(MaterialType.PowerCard).id(PowerCard.Dominate).getIndex()
          })
      )
    }


    if (redDice.length) {
      moves.push(
        redDice
          .dealAtOnce({
            type: LocationType.PlayerHand,
            player: this.player
          }, redDice.length)
      )
    }

    moves.push(this.startRule(RuleId.RollDice))

    return moves
  }

  afterItemMove(move: ItemMove) {
    const moves = super.afterItemMove(move)
    if (!isMoveItemType(MaterialType.PowerCard)(move)) return moves
    if (!this.keepCards.length) return [this.startPlayerTurn(RuleId.Effect, this.rival)]
    return moves
  }

  get rival() {
    return this.game.players.find((p) => p !== this.player)!
  }

  get keepCards() {
    return this
      .material(MaterialType.PowerCard)
      .location(LocationType.PlayerKeepCards)
      .player(this.player)
  }

  get redDice() {
    return this
      .material(MaterialType.Dice)
      .id(DiceColor.Red)
  }

  onRuleEnd() {
    this.forget(Memory.Dominate)
    return []
  }
}