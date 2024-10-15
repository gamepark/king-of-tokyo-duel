import { isMoveItem, ItemMove, Location } from '@gamepark/rules-api'
import { Buzz, buzzDescriptions, getBuzzSpaces } from '../material/Buzz'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Pawn } from '../material/Pawn'
import { BasePlayerTurnEffectRule } from './BasePlayerTurnEffectRule'
import { PullPawn } from './effects/EffectType'
import { KeepHelper } from './helper/KeepHelper'
import { RuleId } from './RuleId'

export class PullPawnRule extends BasePlayerTurnEffectRule<PullPawn> {
  onRuleStart() {
    const effectWSource = this.currentEffect
    const pawn = this.getPawn(effectWSource.effect.pawn)
    const nextX = this.getNextX(pawn.getItem()!.location)
    return [pawn.moveItem((item) => ({ ...item.location, x: nextX }))]
  }

  getNextX(pawnLocation: Location) {
    const isLeft = this.game.players[0] === this.currentEffect.target
    const x = pawnLocation.x!
    if (x - Math.floor(x) === 0.5) {
      return isLeft ? x - 0.5 : x + 0.5
    } else {
      const nextX = isLeft ? x - 1 : x + 1
      const startBuzz = this.getBuzzItemAtX(pawnLocation.type, x)
      const endBuzz = this.getBuzzItemAtX(pawnLocation.type, nextX)
      if (startBuzz && endBuzz && startBuzz.id === endBuzz.id) {
        if (buzzDescriptions[startBuzz.id!].changeTrack === -1) {
          return isLeft ? nextX - 1 : nextX + 1
        } else if (buzzDescriptions[startBuzz.id!].changeTrack === +1) {
          return isLeft ? nextX + 0.5 : nextX - 0.5
        }
      }
      return nextX
    }
  }

  getBuzzItemAtX(track: LocationType, x: number) {
    const buzzItems = this.material(MaterialType.Buzz).location(track).getItems<Buzz>()
    return buzzItems.find(item => getBuzzSpaces(item.location, item.id!).some(space => space.x === x))
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItem(move) && move.itemType === MaterialType.Pawn) {
      if (this.isTriggeringEnd(move.location.x!)) {
        return [this.endGame()]
      } else {
        const effectWSource = this.currentEffect
        new KeepHelper(this.game).afterPullPawn(effectWSource.effect.pawn)
        return [this.startRule(RuleId.Effect)]
      }
    }
    return super.afterItemMove(move)
  }

  isTriggeringEnd(pawnX: number) {
    return Math.abs(pawnX) === 7
  }

  getPawn(pawn: Pawn) {
    return this.material(MaterialType.Pawn).id(pawn)
  }

  onRuleEnd() {
    const effectWSource = this.currentEffect
    if (effectWSource.effect.count === 1) {
      return super.onRuleEnd()
    } else {
      effectWSource.effect.count--
      return []
    }
  }
}