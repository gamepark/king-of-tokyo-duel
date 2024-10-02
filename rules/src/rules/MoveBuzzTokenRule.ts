import { isMoveItemType, ItemMove, Location } from '@gamepark/rules-api'
import range from 'lodash/range'
import { powerCardCharacteristics } from '../material/cards/PowerCardCharacteristics'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { Effect } from './effects/EffectType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class MoveBuzzTokenRule extends BasePlayerTurnRule {
  onRuleStart() {
    return []
  }

  getPlayerMoves() {
    const validLocations: Location[] = range(-7, 7).filter(x => x !== 0).map(x => (
      { type: LocationType.DestructionTrack, x, y: 0, rotation: 0 }
    ))
    validLocations.push(...range(-7, 7).filter(x => x !== 0).map(x => (
      { type: LocationType.FameTrack, x, y: 0, rotation: 0 }
    )))
    return super.getPlayerMoves().concat(
      ...validLocations.map(location =>
        this.material(MaterialType.Buzz).id(this.buzz).moveItem(location)
      )
    )
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Buzz)(move)) return []
    if (this.effects.length) {
      return [this.startRule(RuleId.Effect)]
    }

    return [this.startRule(RuleId.EndOfTurn)]
  }

  get effects() {
    return this.remind<Effect[]>(Memory.Effects) ?? []
  }

  get buzz() {
    const bougthCards = this.remind(Memory.BoughtCards) ?? []
    const card = bougthCards[bougthCards.length - 1]
    if (card === undefined) {
      console.error("If we are in move token rule, a bought card MUST be present")
    }

    const item = this.material(MaterialType.PowerCard).getItem(card)!
    const buzz = powerCardCharacteristics[item.id].buzz
    if (buzz === undefined) {
      console.error("The last bought card has NO buzz token")
    }

    return buzz
  }

  onRuleEnd() {
    return []
  }
}