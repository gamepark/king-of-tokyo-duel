import { CustomMove, isCustomMoveType, MaterialMove } from '@gamepark/rules-api'
import sumBy from 'lodash/sumBy'
import { DiceFace } from '../material/DiceFace'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Monster } from '../material/Monster'
import { Pawn } from '../material/Pawn'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { CustomMoveType } from './CustomMoveType'
import { EffectType } from './effects/EffectType'
import { EffectWithSource } from './effects/EffectWithSource'
import { HealHelper } from './helper/HealHelper'
import { KeepHelper } from './helper/KeepHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class ResolveDiceRule extends BasePlayerTurnRule {
  onRuleStart() {
    this.memorize(Memory.Phase, RuleId.ResolveDice)
    if (!this.getPlayerMoves().length) return [this.startRule(RuleId.Buy)]
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = super.getPlayerMoves()
    if (!this.isAlreadyConsumed(DiceFace.Energy) && this.buildEffect(EffectType.GainEnergy, DiceFace.Energy) !== undefined) moves.push(this.customMove(CustomMoveType.ResolveKind, DiceFace.Energy))
    if (!this.isAlreadyConsumed(DiceFace.Claw) && this.buildEffect(EffectType.Smash, DiceFace.Claw, this.rival) !== undefined) moves.push(this.customMove(CustomMoveType.ResolveKind, DiceFace.Claw))
    if (!this.isAlreadyConsumed(DiceFace.Fame) && this.buildEffect(EffectType.PullPawn, DiceFace.Fame) !== undefined) moves.push(this.customMove(CustomMoveType.ResolveKind, DiceFace.Fame))
    if (!this.isAlreadyConsumed(DiceFace.Destruction) && this.buildEffect(EffectType.PullPawn, DiceFace.Destruction) !== undefined) moves.push(this.customMove(CustomMoveType.ResolveKind, DiceFace.Destruction))
    if (!this.isAlreadyConsumed(DiceFace.Heal) && this.buildEffect(EffectType.Heal, DiceFace.Heal) !== undefined) moves.push(this.customMove(CustomMoveType.ResolveKind, DiceFace.Heal))
    // TODO
    // if (this.power) moves.push(this.startRule(RuleId.MonsterRule
    return moves
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (!isCustomMoveType(CustomMoveType.ResolveKind)(move)) return []
    this.consumeFaces(move.data)
    switch (move.data) {
      case DiceFace.Energy:
        this.addEffect(this.buildEffect(EffectType.GainEnergy, DiceFace.Energy)!)
        break;
      case DiceFace.Claw:
        this.addEffect(this.buildEffect(EffectType.Smash, DiceFace.Claw, this.rival)!)
        break
      case DiceFace.Heal:
        this.addEffect(this.buildEffect(EffectType.Heal, DiceFace.Heal)!)
        break
      case DiceFace.Fame:
        this.addEffect(this.buildEffect(EffectType.PullPawn, DiceFace.Fame)!)
        break
      case DiceFace.Destruction:
        this.addEffect(this.buildEffect(EffectType.PullPawn, DiceFace.Destruction)!)
        break
      default:
        console.log("NOT IMPLEMENTED YET", move.data)
    }

    if (this.effects.length) {
      return [this.startRule(RuleId.Effect)]
    }

    return [this.startRule(RuleId.Buy)]

  }

  get effects() {
    return this.remind(Memory.Effects)
  }

  buildEffect(type: EffectType, face: DiceFace, target: Monster = this.player): EffectWithSource | undefined {
    const effectWithSource: EffectWithSource = {
      sources: [],
      effect: {
        type: type,
        count: 0,
        me: target === this.player
      },
      target: target,
    }

    const dice = this.getDiceForFace(face)
    if (dice.length) {
      effectWithSource.sources.push({
        type: MaterialType.Dice,
        indexes: dice.getIndexes(),
        count: dice.length
      })
    }

    const bonuses = new KeepHelper(this.game).getBonusFaces(face)
    const bonus = sumBy(bonuses, (bonus) => bonus.count)
    if (bonus) {
      effectWithSource.sources.push(
        ...bonuses.flatMap(({ count, ...source }) => source.items )
      )
    }


    effectWithSource.effect.count = sumBy(effectWithSource.sources, (source) => source.count ?? 0)
    if (face === DiceFace.Fame || face === DiceFace.Destruction) {
      effectWithSource.effect.pawn = face === DiceFace.Fame? Pawn.Fame: Pawn.Destruction
      effectWithSource.effect.count = Math.floor(effectWithSource.effect.count / 3) + Math.max(0, effectWithSource.effect.count - 3)
    }

    if (effectWithSource.effect.count) {
      if (face === DiceFace.Heal) {
        effectWithSource.effect.count = new HealHelper(this.game, this.player).heal(effectWithSource.effect.count)
        if (!effectWithSource.effect.count) return
      }

      return effectWithSource
    }

    return
  }

  addEffect(effect: EffectWithSource) {
    this.memorize(Memory.Effects, (effects: EffectWithSource[] = []) => {
      effects.push(effect)
      return effects
    })
  }

  consumeFaces(face: DiceFace) {
    this.memorize(Memory.DiceFacesSolved, (faces: DiceFace[] = []) => {
      faces.push(face)
      return faces
    })
  }

  getDiceForFace(face: DiceFace) {
    return this
      .dice
      .rotation(face)
  }

  get dice() {
    return this
      .material(MaterialType.Dice)
      .location(LocationType.PlayerRolledDice)
      .player(this.player)
  }

  isAlreadyConsumed(face: DiceFace) {
    return (this.remind(Memory.DiceFacesSolved) ?? []).includes(face)
  }
}