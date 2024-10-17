import { isCreateItemTypeAtOnce, isDeleteItemTypeAtOnce, isRollItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import times from 'lodash/times'
import { DiceColor } from '../material/DiceColor'
import { DiceFace } from '../material/DiceFace'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class CamouflageRule extends BasePlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    return [
      this.material(MaterialType.Dice)
        .createItemsAtOnce(
          times(this.damageContext.effect.count).map(() => ({
            id: DiceColor.Red,
            location: {
              type: LocationType.PlayerHand,
              player: this.player
            }
          }))
        )
    ]
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves = super.afterItemMove(move)
    const dice = this
      .material(MaterialType.Dice)
      .location(LocationType.PlayerHand)
      .player(this.player)

    if (isCreateItemTypeAtOnce(MaterialType.Dice)(move)) {
      moves.push(...dice.rollItems())
      moves.push(dice.deleteItemsAtOnce())
    }

    if (isRollItemType(MaterialType.Dice)(move)) {
      this.incrementRoll()
      const damagesContext = this.damageContext
      if (move.location.rotation === DiceFace.Heal) {
        damagesContext.effect.count -= 1
        for (const source of damagesContext.sources) {
          if (source.indexes.length) {
            source.indexes = source.indexes.slice(1)
            break;
          }
        }
      }

      if (isDeleteItemTypeAtOnce(MaterialType.Dice)(move)) {
        moves.push(this.startPlayerTurn(RuleId.PreventDamages, this.rival))
      }

      this.forget(Memory.CamouflageRolledDiceCount)
    }

    return moves
  }

  incrementRoll() {
    this.memorize<number>(Memory.CamouflageRolledDiceCount, (count: number = 0) => count++)
  }

  get damageContext() {
    return this.currentEffect
  }

  // This to prevent removing the effect from the memory
  onRuleEnd() {
    return []
  }
}