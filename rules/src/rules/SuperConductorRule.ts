import { CustomMove, isCreateItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { PowerCard } from '../material/cards/PowerCard'
import { DiceFace } from '../material/DiceFace'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { CustomMoveType } from './CustomMoveType'
import { EnergyHelper } from './helper/EnergyHelper'
import { isChangingRule } from './IsChangingRule'
import { RuleId } from './RuleId'

export class SuperConductorRule extends BasePlayerTurnRule {
  getPlayerMoves() {
    const moves = super.getPlayerMoves()
    moves.push(this.customMove(CustomMoveType.Ignore))
    moves.push(...new EnergyHelper(this.game, this.player).gain(this.energyDice))
    return moves
  }

  onCustomMove(move: CustomMove) {
    const moves = super.onCustomMove(move)
    if (moves.some(isChangingRule)) return moves
    moves.push(this.startPlayerTurn(RuleId.Buy, this.rival))
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove<number, number, number>[] {
    const moves = super.afterItemMove(move)
    if (moves.some(isChangingRule)) return moves
    if (!isCreateItemType(MaterialType.Energy)(move)) return moves
    moves.push(this.material(MaterialType.PowerCard).id(PowerCard.Superconductor).moveItem({ type: LocationType.Discard }))
    moves.push(this.startPlayerTurn(RuleId.Buy, this.rival))
    return moves
  }


  get dice() {
    return this
      .material(MaterialType.Dice)
      .location(LocationType.PlayerRolledDice)
      .player(this.rival)
  }

  get energyDice() {
    return this
      .dice
      .rotation(DiceFace.Energy)
      .length
  }

  // TODO: do effect and then call this.nextRuleMove
}