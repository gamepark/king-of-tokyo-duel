import { HexGridSystem, hexRotate, isMoveItem, ItemMove, Location, MaterialItem } from '@gamepark/rules-api'
import { buzzDescriptions, getBuzzSpaces } from '../material/Buzz'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Pawn } from '../material/Pawn'
import { BasePlayerTurnEffectRule } from './BasePlayerTurnEffectRule'
import { Effect, EffectType, PullPawn } from './effects/EffectType'
import { EffectWithSource } from './effects/EffectWithSource'
import { KeepHelper } from './helper/KeepHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class PullPawnRule extends BasePlayerTurnEffectRule<PullPawn> {
  onRuleStart() {
    const effectWSource = this.currentEffect
    const pawn = this.getPawn(effectWSource.effect.pawn)
    const nextX = this.getNextX(pawn.getItem()!.location)

    if (effectWSource.effect.count === 1) {
      this.memorize(Memory.Effects, (effects: EffectWithSource[]) => effects.slice(1))
    } else {
      effectWSource.effect.count--
    }

    return [pawn.moveItem((item) => ({ ...item.location, x: nextX }))]
  }

  getNextX(pawnLocation: Location) {
    const isLeft = this.game.players[0] === this.currentEffect.target
    const x = pawnLocation.x!
    if (x - Math.floor(x) === 0.5) {
      return isLeft ? x - 0.5 : x + 0.5
    } else {
      const nextX = isLeft ? x - 1 : x + 1
      const startBuzz = this.getBuzzAtX(pawnLocation.type, x).getItem()
      const endBuzz = this.getBuzzAtX(pawnLocation.type, nextX).getItem()
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

  getBuzzAtX(track: LocationType, x: number) {
    return this.material(MaterialType.Buzz).location(track)
      .filter(item => getBuzzSpaces(item.location, item.id!).some(space => Math.abs(space.x - x) <= 0.5))
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItem(move) && move.itemType === MaterialType.Pawn) {
      if (this.isTriggeringEnd(move.location.x!)) {
        return [this.endGame()]
      } else {
        const buzz = this.getBuzzAtX(move.location.type!, move.location.x!)
        if (buzz.length === 1) {
          const effect = this.getBuzzEffect(buzz.getItem()!, move.location as Location)
          if (effect) {
            const target = effect.type === EffectType.Smash ? this.nextPlayer : this.player
            this.unshiftEffect({ sources: [{ type: MaterialType.Buzz, indexes: buzz.getIndexes() }], target, effect })
          }
        }

        new KeepHelper(this.game).afterPullPawn(this.material(MaterialType.Pawn).getItem<Pawn>(move.itemIndex).id!)
        return [this.startRule(RuleId.Effect)]
      }
    }
    return super.afterItemMove(move)
  }

  getBuzzEffect(buzzItem: MaterialItem, location: Location): Effect | undefined {
    if (location.x! - Math.floor(location.x!) === 0.5) {
      return buzzDescriptions[buzzItem.id!].extraSpaceEffect
    }
    const vector = { x: location.x! - buzzItem.location.x!, y: 0 }
    const coordinates = hexRotate(vector, buzzItem.location.rotation, location.type === LocationType.FameTrack ? HexGridSystem.EvenQ : HexGridSystem.OddQ)
    return buzzDescriptions[buzzItem.id!].effects[coordinates.x] ?? undefined
  }

  isTriggeringEnd(pawnX: number) {
    return Math.abs(pawnX) === 7
  }

  getPawn(pawn: Pawn) {
    return this.material(MaterialType.Pawn).id(pawn)
  }

  onRuleEnd() {
    // We removed or decremented the effect onRuleStart, so we must not call super.onRuleEnd()
    return []
  }
}