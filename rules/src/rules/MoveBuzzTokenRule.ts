import { isMoveItemType, ItemMove, Location, MaterialMove } from '@gamepark/rules-api'
import range from 'lodash/range'
import { Buzz, buzzDescriptions, commonBuzz, getBuzzSpaces } from '../material/Buzz'
import { PowerCard } from '../material/cards/PowerCard'
import { powerCardCharacteristics } from '../material/cards/PowerCardCharacteristics'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class MoveBuzzTokenRule extends BasePlayerTurnRule {
  onRuleStart() {
    const buzz = this.buzz
    if (buzz !== undefined && buzz !== Buzz.TheKingBuzz) {
      const buzzItem = this.material(MaterialType.Buzz).id(buzz).getItem<Buzz>()!
      if (buzzItem.location.type === LocationType.FameTrack || buzzItem.location.type === LocationType.DestructionTrack) {
        const buzzSpaces = getBuzzSpaces(buzzItem.location, buzz)
        const pawnItem = this.material(MaterialType.Pawn).location(buzzItem.location.type).getItem()!
        if (buzzSpaces.some(space => Math.abs(space.x - pawnItem.location.x!) <= 0.5)) {
          // The fame or destruction marker is on the buzz token, it cannot be moved
          return this.startNextRule
        } else {
          // The buzz token is on the track: move it back to the stock
          return [this.material(MaterialType.Buzz).id(buzz).moveItem({
            type: LocationType.BuzzStock,
            x: commonBuzz.indexOf(buzz),
            rotation: buzzItem.location.rotation
          })]
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
          if (buzzSize === 1 || getBuzzSpaces({ type: track, x, rotation }, buzz).every(hex => hex.y === 0 && freeSpaces.includes(hex.x))) {
            validLocations.push({ type: track, x, y: 0, rotation })
          }
        }
      }
    }

    return super.getPlayerMoves().concat(
      ...validLocations.map(location =>
        this.material(MaterialType.Buzz).id(buzz).moveItem(location)
      )
    )
  }

  getTrackFreeSpaces(track: LocationType) {
    const pawns = this.material(MaterialType.Pawn).location(track).getItems()
    const buzzItems = this.material(MaterialType.Buzz).location(track).getItems<Buzz>()
    const buzzSpaces = buzzItems.flatMap(item => getBuzzSpaces(item.location, item.id as Buzz))
    return range(-7, 8).filter(x => !pawns.some(pawn => pawn.location.x === x) && !buzzSpaces.some(space => space.x === x))
  }

  afterItemMove(move: ItemMove) {
    const moves: MaterialMove[] = super.afterItemMove(move)
    if (!isMoveItemType(MaterialType.Buzz)(move) || move.location.type === LocationType.BuzzStock) return moves
    moves.push(...this.startNextRule)
    return moves
  }

  get startNextRule() {
    if (this.effects.length) {
      return [this.startRule(RuleId.Effect)]
    } else {
      return [this.startRule(this.remind(Memory.Phase))]
    }
  }

  get buzz() {
    const boughtCards = this.remind(Memory.BoughtCards) ?? []
    const card = boughtCards[boughtCards.length - 1]
    if (card === undefined) {
      //console.error('If we are in move token rule, a bought card MUST be present')
    }

    const item = this.material(MaterialType.PowerCard).getItem<PowerCard>(card)!
    const buzz = powerCardCharacteristics[item.id].buzz
    if (buzz === undefined) {
      //console.error('The last bought card has NO buzz token')
    }

    return buzz
  }

  onRuleEnd() {
    return []
  }
}
