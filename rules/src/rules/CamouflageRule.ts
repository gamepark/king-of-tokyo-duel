import { isCreateItemTypeAtOnce, isDeleteItemTypeAtOnce, isRollItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import times from 'lodash/times'
import { PowerCard } from '../material/cards/PowerCard'
import { DiceColor } from '../material/DiceColor'
import { DiceFace } from '../material/DiceFace'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { Smash } from './effects/EffectType'
import { RuleId } from './RuleId'

export class CamouflageRule extends BasePlayerTurnRule<Smash> {
  onRuleStart(): MaterialMove[] {
    const damageContext = this.damageContext
    damageContext.sources.push({
      type: MaterialType.PowerCard,
      indexes: [this.cardIndex],
      count: 0
    })
    return [
      this.material(MaterialType.Dice)
        .createItemsAtOnce(
          times(damageContext.effect.count).map(() => ({
            id: DiceColor.Red,
            location: {
              type: LocationType.PlayerDiceRoll,
              player: this.player
            }
          }))
        )
    ]
  }

  get cardIndex() {
    return this.material(MaterialType.PowerCard).id(PowerCard.Camouflage).getIndex()
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves = super.afterItemMove(move)
    const dice = this
      .material(MaterialType.Dice)
      .location(LocationType.PlayerDiceRoll)
      .player(this.player)

    if (isCreateItemTypeAtOnce(MaterialType.Dice)(move)) {
      moves.push(...dice.rollItems())
      moves.push(dice.deleteItemsAtOnce())
    }

    if (isRollItemType(MaterialType.Dice)(move)) {
      const damagesContext = this.damageContext
      if (move.location.rotation === DiceFace.Heal) {
        damagesContext.effect.count -= 1
        for (const source of damagesContext.sources) {
          if (source.count && source.count > 0) {
            source.count--
            break
          }
        }
        damagesContext.sources.find(source => source.type === MaterialType.PowerCard && source.indexes.includes(this.cardIndex))!.count!--
      }
    }

    if (isDeleteItemTypeAtOnce(MaterialType.Dice)(move)) {
      moves.push(this.startRule(RuleId.PreventDamages))
    }

    return moves
  }

  get damageContext() {
    return this.currentEffect
  }
}