import { isMoveItem, ItemMove, Location } from '@gamepark/rules-api'
import { Buzz, buzzDescriptions, getBuzzEffect, getBuzzSpaces } from '../material/Buzz'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Monster } from '../material/Monster'
import { Pawn } from '../material/Pawn'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { EffectType, PullPawn } from './effects/EffectType'
import { GameOverRule } from './GameOverRule'
import { KeepHelper } from './helper/KeepHelper'
import { RuleId } from './RuleId'

export class PullPawnRule extends BasePlayerTurnRule<PullPawn> {
  onRuleStart() {
    const effectWSource = this.currentEffect
    const pawn = this.getPawn(effectWSource.effect.pawn)
    const nextX = this.getNextX(pawn.getItem()!.location)

    if (effectWSource.effect.count > 1 && !this.pullIsStopped(nextX)) {
      this.unshiftEffect({ ...effectWSource, effect: { ...effectWSource.effect, count: effectWSource.effect.count - 1 } })
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
      const startBuzz = this.getBuzzAtX(pawnLocation.type, x).getItem<Buzz>()
      const endBuzz = this.getBuzzAtX(pawnLocation.type, nextX).getItem<Buzz>()
      if (startBuzz && endBuzz && startBuzz.id === endBuzz.id) {
        if (buzzDescriptions[startBuzz.id].changeTrack === -1) {
          return isLeft ? nextX - 1 : nextX + 1
        } else if (buzzDescriptions[startBuzz.id].changeTrack === +1) {
          return isLeft ? nextX + 0.5 : nextX - 0.5
        }
      }
      return nextX
    }
  }

  pullIsStopped(x: number) {
    if (this.player === Monster.TheKing) return false
    const effectWSource = this.currentEffect
    const pawn = this.getPawn(effectWSource.effect.pawn)
    return this.getBuzzAtX(pawn.getItem()!.location.type, x).getItem<Buzz>()?.id === Buzz.TheKingBuzz
  }

  getBuzzAtX(track: LocationType, x: number) {
    return this.material(MaterialType.Buzz).location(track)
      .filter<Buzz>(item => getBuzzSpaces(item.location, item.id).some(space => Math.abs(space.x - x) <= 0.5))
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItem(move) && move.itemType === MaterialType.Pawn) {
      if (new GameOverRule(this.game).isWinner(this.player)) {
        return [this.endGame()]
      } else {
        const buzz = this.getBuzzAtX(move.location.type!, move.location.x!)
        if (buzz.length === 1) {
          const effect = getBuzzEffect(buzz.getItem()!, move.location as Location)
          if (effect) {
            const target = effect.type === EffectType.Smash ? this.nextPlayer : this.player
            const effectWithSource = { sources: [{ type: MaterialType.Buzz, indexes: buzz.getIndexes(), count: 1 }], target, effect }
            const buzzBonusAlternatives = new KeepHelper(this.game).buzzBonusAlternatives.filter(alt => alt.effect.type !== effect.type)
            if (buzzBonusAlternatives.length > 0) {
              this.unshiftEffect({
                sources: [],
                target: this.player,
                effect: { type: EffectType.EffectChoice, effects: buzzBonusAlternatives.concat(effectWithSource) }
              })
            } else {
              this.unshiftEffect(effectWithSource)
            }
          }
        }

        new KeepHelper(this.game).afterPullPawn(this.material(MaterialType.Pawn).getItem<Pawn>(move.itemIndex).id)
        return [this.startRule(RuleId.Effect)]
      }
    }
    return super.afterItemMove(move)
  }

  getPawn(pawn: Pawn) {
    return this.material(MaterialType.Pawn).id(pawn)
  }
}
