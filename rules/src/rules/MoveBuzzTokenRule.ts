import { axialToEvenQ, getPolyhexSpaces, HexGridSystem, isMoveItemType, ItemMove, Location, oddQToAxial } from '@gamepark/rules-api'
import range from 'lodash/range'
import { Buzz, buzzDescriptions } from '../material/Buzz'
import { PowerCard } from '../material/cards/PowerCard'
import { powerCardCharacteristics } from '../material/cards/PowerCardCharacteristics'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { Effect } from './effects/EffectType'
import { EffectHelper } from './helper/EffectHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class MoveBuzzTokenRule extends BasePlayerTurnRule {
  onRuleStart() {
    const buzz = this.buzz
    if (buzz !== undefined && buzz !== Buzz.TheKingBuzz) {
      const buzzItem = this.material(MaterialType.Buzz).id(buzz).getItem<Buzz>()!
      if (buzzItem.location.type === LocationType.FameTrack || buzzItem.location.type === LocationType.DestructionTrack) {
        const buzzSpaces = this.getBuzzSpaces(buzzItem.location, buzz)
        const pawnItem = this.material(MaterialType.Pawn).location(buzzItem.location.type).getItem()!
        if (buzzSpaces.some(space => space.x === pawnItem.location.x)) {
          // The fame or destruction marker is on the buzz token, it cannot be moved
          return this.startNextRule
        } else {
          // The buzz token is on the track: move it up a little bit so that player can rotate it and replace it on the original spot or wherever he likes
          return [this.material(MaterialType.Buzz).id(buzz).moveItem(item => ({ ...item.location, y: -1 }))]
        }
      }
    }
    return this.getPlayerMoves().length === 0 ? this.startNextRule : []
  }

  getPlayerMoves() {
    const buzz = this.buzz
    if (buzz === undefined) return []
    const buzzSize = buzzDescriptions[buzz].effects.length
    const rotations = buzzSize === 1 ? [0] : buzzSize === 2 ? [0, 2, 3, 5] : [0, 3]
    const validLocations: Location[] = []
    for (const track of [LocationType.FameTrack, LocationType.DestructionTrack]) {
      const freeSpaces = this.getTrackFreeSpaces(track)
      for (const x of freeSpaces) {
        for (const rotation of rotations) {
          if (buzzSize === 1 || this.getBuzzSpaces({ type: track, x, rotation }).every(hex => hex.y === 0 && freeSpaces.includes(hex.x))) {
            validLocations.push({ type: track, x, y: 0, rotation })
          }
        }
      }
    }
    return super.getPlayerMoves().concat(
      ...validLocations.map(location =>
        this.material(MaterialType.Buzz).id(buzz).moveItem(location) // TODO moveItems for king buzz
      )
    )
  }

  getBuzzSpaces(location: Location, buzz: Buzz = this.buzz!) {
    if (location.type === LocationType.FameTrack) {
      const shape = this.getBuzzShape(buzz).map(oddQToAxial).map(axialToEvenQ)
      return getPolyhexSpaces(shape, location, HexGridSystem.EvenQ)
    } else {
      return getPolyhexSpaces(this.getBuzzShape(buzz), location, HexGridSystem.OddQ)
    }
  }

  getBuzzShape(buzz: Buzz = this.buzz!) {
    return buzzDescriptions[buzz].effects.map((_, x) => ({ x, y: 0 }))
  }

  getTrackFreeSpaces(track: LocationType) {
    const pawns = this.material(MaterialType.Pawn).location(track).getItems()
    const buzzItems = this.material(MaterialType.Buzz).location(track).getItems<Buzz>()
    const buzzSpaces = buzzItems.flatMap(item => this.getBuzzSpaces(item.location, item.id))
    return range(-7, 8).filter(x => !pawns.some(pawn => pawn.location.x === x) && !buzzSpaces.some(space => space.x === x))
  }

  afterItemMove(move: ItemMove) {
    return isMoveItemType(MaterialType.Buzz)(move) ? this.startNextRule : []
  }

  get startNextRule() {
    const effects = new EffectHelper(this.game, this.player).applyEffectMoves()
    if (effects.length) {
      return effects
    } else {
      return [this.startRule(RuleId.Buy)]
    }
  }

  get effects() {
    return this.remind<Effect[]>(Memory.Effects) ?? []
  }

  get buzz() {
    const boughtCards = this.remind(Memory.BoughtCards) ?? []
    const card = boughtCards[boughtCards.length - 1]
    if (card === undefined) {
      console.error('If we are in move token rule, a bought card MUST be present')
    }

    const item = this.material(MaterialType.PowerCard).getItem<PowerCard>(card)!
    const buzz = powerCardCharacteristics[item.id!].buzz
    if (buzz === undefined) {
      console.error('The last bought card has NO buzz token')
    }

    return buzz
  }

  onRuleEnd() {
    return []
  }
}