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
import { AlienoidRule } from './power/AlienoidRule'
import { CyberKittyRule } from './power/CyberKittyRule'
import { GigazaurRule } from './power/GigazaurRule'
import { SpacePenguinRule } from './power/SpacePenguinRule'
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
    if (this.canGainEnergy()) moves.push(this.customMove(CustomMoveType.ResolveKind, DiceFace.Energy))
    if (this.canSmash()) moves.push(this.customMove(CustomMoveType.ResolveKind, DiceFace.Claw))
    if (this.canPullFame()) moves.push(this.customMove(CustomMoveType.ResolveKind, DiceFace.Fame))
    if (this.canPullDestruction()) moves.push(this.customMove(CustomMoveType.ResolveKind, DiceFace.Destruction))
    if (this.canHeal()) moves.push(this.customMove(CustomMoveType.ResolveKind, DiceFace.Heal))
    if (this.canUsePower()) moves.push(this.customMove(CustomMoveType.ResolveKind, DiceFace.Power))
    return moves
  }

  canUsePower() {
    return this.isPowerWithRule
  }

  canHeal() {
    return !this.isAlreadyConsumed(DiceFace.Heal) && this.buildEffect(EffectType.Heal, DiceFace.Heal) !== undefined
  }

  canPullDestruction() {
    return !this.isAlreadyConsumed(DiceFace.Destruction) && this.buildEffect(EffectType.PullPawn, DiceFace.Destruction) !== undefined
  }

  canPullFame() {
    return !this.isAlreadyConsumed(DiceFace.Fame) && this.buildEffect(EffectType.PullPawn, DiceFace.Fame) !== undefined
  }

  canGainEnergy() {
    return !this.isAlreadyConsumed(DiceFace.Energy) && this.buildEffect(EffectType.GainEnergy, DiceFace.Energy) !== undefined
  }

  canSmash() {
    return !this.isAlreadyConsumed(DiceFace.Claw) && this.buildEffect(EffectType.Smash, DiceFace.Claw, this.rival) !== undefined
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
        const power = this.getMonsterPower()
        if (power.length) return power
        break
      default:
        console.log("NOT IMPLEMENTED YET", move.data)
    }

    if (this.effects.length) {
      return [this.startRule(RuleId.Effect)]
    }

    return [this.startRule(RuleId.Buy)]

  }

  get isPowerWithRule() {
    return this.getMonsterPower().length > 0
  }

  getMonsterPower() {
    const powerDice = this.getDiceForFace(DiceFace.Power).length - this.consumedPower
    switch (this.player) {
      case Monster.Alienoid:
        if (new AlienoidRule(this.game).getPlayerMoves().length > 0) return [this.startRule(RuleId.Alienoid)]
        return []
      case Monster.CyberKitty:
        if (new CyberKittyRule(this.game).getPlayerMoves().length > 0) return [this.startRule(RuleId.CyberKitty)]
        return []
      case Monster.Gigazaur:
        if (new GigazaurRule(this.game).getPlayerMoves().length > 0) return [this.startRule(RuleId.Gigazaur)]
        return []
      case Monster.SpacePenguin:
        if (new SpacePenguinRule(this.game).onRuleStart().length > 0) return [this.startRule(RuleId.SpacePenguin)]
        return []
      case Monster.TheKing:
        if (powerDice < 2) return []
        return [this.startRule(RuleId.TheKing)]
    }

    return []
  }

  get consumedPower() {
    return this.remind(Memory.ConsumedPower) ?? 0
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
        rival: target !== this.player
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

      if (face === DiceFace.Claw) {
        effectWithSource.effect.count = this.getClawCount(effectWithSource.effect.count)
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

  getClawCount(baseCount: number) {
    if (this.player === Monster.MekaDragon) {
      const powerDice = this.dice.rotation(DiceFace.Power).length
      if (powerDice > 1) return powerDice * baseCount
    }

    return baseCount
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