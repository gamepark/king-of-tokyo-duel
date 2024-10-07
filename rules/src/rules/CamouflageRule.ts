import { isCreateItemTypeAtOnce, isRollItemType, ItemMove, MaterialMove, RuleMove, RuleStep } from '@gamepark/rules-api'
import times from 'lodash/times'
import { DiceColor } from '../material/DiceColor'
import { DiceFace } from '../material/DiceFace'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { DamageContext } from './helper/DamageContext'
import { SmashHelper } from './helper/SmashHelper'
import { isChangingRule, isStartingRule } from './IsChangingRule'
import { Memory } from './Memory'

export class CamouflageRule extends BasePlayerTurnRule {
  onRuleStart(move: RuleMove, previousRule?: RuleStep): MaterialMove[] {
    if (isStartingRule(move) && !this.remind(Memory.PreviousRule)) this.memorize(Memory.PreviousRule, { ...previousRule })
    return [
      this.material(MaterialType.Dice)
        .createItemsAtOnce(
          times(this.damageContext.damages).map(() => ({
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
      moves.push(...dice.deleteItems())

      const frozenMoves = this.frozenMoves
      if (!frozenMoves.length || !frozenMoves.some(isChangingRule)) {
        moves.push(this.goToPreviousRule())
      } else {
         moves.push(...frozenMoves)
      }
    }

    if (isRollItemType(MaterialType.Dice)(move)) {
      this.incrementRoll()
      const damagesContext = this.damageContext
      if (move.location.rotation === DiceFace.Heal) {
        damagesContext.damages -= 1
        damagesContext.indexes = damagesContext.indexes.slice(-1)
      }

      if (this.countRoll === dice.length && damagesContext.damages > 0) {
        moves.push(
          ...new SmashHelper(this.game, this.player).smash(damagesContext.type, damagesContext.indexes, damagesContext.damages)
        )
      }

      this.forget(Memory.CamouflageRolledDiceCount)
    }

    return moves
  }

  get frozenMoves(): MaterialMove[] {
    return this.remind(Memory.FrozenMoves) ?? []
  }

  incrementRoll() {
    this.memorize<number>(Memory.CamouflageRolledDiceCount, (count: number = 0) => count++)
  }

  get countRoll() {
    return this.remind<number>(Memory.CamouflageRolledDiceCount) ?? 0
  }

  goToPreviousRule() {
    const previewRule = this.remind(Memory.PreviousRule)!
    if (previewRule.player !== this.player) return this.startPlayerTurn(previewRule.id, previewRule.player)
    return this.startRule(previewRule.id)
  }

  get damageContext() {
    return this.remind<DamageContext>(Memory.SuspendedDamages)
  }

  onRuleEnd() {
    this.forget(Memory.SuspendedDamages)
    return []
  }
}