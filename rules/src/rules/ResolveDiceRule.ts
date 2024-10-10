import { CustomMove, isCustomMoveType, MaterialMove } from '@gamepark/rules-api'
import sumBy from 'lodash/sumBy'
import { PowerCard } from '../material/cards/PowerCard'
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
    if (this.remind(Memory.Phase) !== RuleId.ResolveDice) {
      new KeepHelper(this.game).beforeResolvingDice()
      if (this.canReboot) {
        return [this.startRule(RuleId.Rebooting)]
      }
    }

    this.memorize(Memory.Phase, RuleId.ResolveDice)
    const startMoves = new KeepHelper(this.game).atStartOfResolving()
    if (startMoves.length) return startMoves
    if (!this.getResolveMoves().length) return [this.startRule(RuleId.Buy)]
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = super.getPlayerMoves()
    moves.push(...this.getResolveMoves())
    return moves
  }

  getResolveMoves() {
    const moves: MaterialMove[] = []
    if (!this.isAlreadyConsumed(DiceFace.Energy) && this.buildEffect(EffectType.GainEnergy, DiceFace.Energy) !== undefined) moves.push(this.customMove(CustomMoveType.ResolveKind, DiceFace.Energy))
    if (!this.isAlreadyConsumed(DiceFace.Claw) && this.buildEffect(EffectType.Smash, DiceFace.Claw, this.rival) !== undefined) moves.push(this.customMove(CustomMoveType.ResolveKind, DiceFace.Claw))
    if (!this.isAlreadyConsumed(DiceFace.Fame) && this.buildEffect(EffectType.PullPawn, DiceFace.Fame) !== undefined) moves.push(this.customMove(CustomMoveType.ResolveKind, DiceFace.Fame))
    if (!this.isAlreadyConsumed(DiceFace.Destruction) && this.buildEffect(EffectType.PullPawn, DiceFace.Destruction) !== undefined) moves.push(this.customMove(CustomMoveType.ResolveKind, DiceFace.Destruction))
    if (!this.isAlreadyConsumed(DiceFace.Heal) && this.buildEffect(EffectType.Heal, DiceFace.Heal) !== undefined) moves.push(this.customMove(CustomMoveType.ResolveKind, DiceFace.Heal))
    if (!this.isAlreadyConsumed(DiceFace.Power)) moves.push(this.customMove(CustomMoveType.ResolveKind, DiceFace.Power))
    return moves
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (!isCustomMoveType(CustomMoveType.ResolveKind)(move)) return []
    this.consumeFaces(move.data)
    switch (move.data) {
      case DiceFace.Energy:
        this.pushEffect(this.buildEffect(EffectType.GainEnergy, DiceFace.Energy)!)
        break;
      case DiceFace.Claw:
        this.pushEffect(this.buildEffect(EffectType.Smash, DiceFace.Claw, this.rival)!)
        break
      case DiceFace.Heal:
        this.pushEffect(this.buildEffect(EffectType.Heal, DiceFace.Heal)!)
        break
      case DiceFace.Fame:
        this.pushEffect(this.buildEffect(EffectType.PullPawn, DiceFace.Fame)!)
        break
      case DiceFace.Destruction:
        this.pushEffect(this.buildEffect(EffectType.PullPawn, DiceFace.Destruction)!)
        break
      case DiceFace.Power:
        return this.getMonsterPower()
      default:
        console.log("NOT IMPLEMENTED YET", move.data)
    }

    if (this.effects.length) {
      return [this.startRule(RuleId.Effect)]
    }

    return [this.startRule(RuleId.Buy)]

  }

  getMonsterPower() {
    switch (this.player) {
      case Monster.Alienoid:
        return [this.startRule(RuleId.Alienoid)]
      case Monster.CyberKitty:
        return [this.startRule(RuleId.CyberKitty)]
      case Monster.Gigazaur:
        return [this.startRule(RuleId.Gigazaur)]
      case Monster.MekaDragon:
        return [this.startRule(RuleId.MekaDragon)]
      case Monster.SpacePenguin:
        return [this.startRule(RuleId.SpacePenguin)]
      case Monster.TheKing:
        return [this.startRule(RuleId.TheKing)]
    }

    return []
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
    console.log(bonus)
    if (bonus) {
      effectWithSource.effect.count += bonus
      effectWithSource.sources.push(
        ...bonuses.flatMap(({ count, ...source }) => source.items )
      )
    }


    effectWithSource.effect.count += sumBy(effectWithSource.sources, (source) => source.count ?? 0)
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

  get canReboot() {
    return this
      .material(MaterialType.PowerCard)
      .id(PowerCard.Rebooting)
      .player(this.player).length > 0 && !this.remind(Memory.SkipReboot)
  }
}