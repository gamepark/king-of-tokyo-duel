import { isMoveItemType, ItemMove, Location } from '@gamepark/rules-api'
import { Buzz } from '../../material/Buzz'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { MoveBuzzTokenRule } from '../MoveBuzzTokenRule'
import { RuleId } from '../RuleId'
import { PowerRule } from './PowerRule'

export class TheKingRule extends PowerRule {
  onRuleStart() {
    if (this.getPlayerMoves().length === 0) {
      this.consumePower(2)
      return [this.startRule(RuleId.ResolveDice)]
    }
    return []
  }

  getPlayerMoves() {
    const validLocations: Location[] = []
    for (const track of [LocationType.FameTrack, LocationType.DestructionTrack]) {
      const freeSpaces = new MoveBuzzTokenRule(this.game).getTrackFreeSpaces(track)
      for (const x of freeSpaces) {
        validLocations.push({ type: track, x, y: 0, rotation: 0 })
      }
    }

    return super.getPlayerMoves().concat(
      ...validLocations.map(location =>
        this.material(MaterialType.Buzz).id(Buzz.TheKingBuzz).moveItems(location)
      )
    )
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Buzz)(move) || move.location.type === LocationType.BuzzStock) {
      return super.afterItemMove(move)
    } else {
      this.consumePower(2)
      return [this.startRule(RuleId.ResolveDice)]
    }
  }
}