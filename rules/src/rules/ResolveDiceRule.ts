import { CustomMove, isCustomMoveType, MaterialMove } from '@gamepark/rules-api'
import sumBy from 'lodash/sumBy'
import { PowerCard } from '../material/cards/PowerCard'
import { DiceFace } from '../material/DiceFace'
import { MaterialType } from '../material/MaterialType'
import { Monster } from '../material/Monster'
import { Pawn } from '../material/Pawn'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { CustomMoveType } from './CustomMoveType'
import { EffectType } from './effects/EffectType'
import { EffectWithSource, Source } from './effects/EffectWithSource'
import { HealHelper } from './helper/HealHelper'
import { KeepHelper } from './helper/KeepHelper'
import { RollHelper } from './helper/RollHelper'
import { Memory } from './Memory'
import { AlienoidRule } from './power/AlienoidRule'
import { CyberKittyRule } from './power/CyberKittyRule'
import { GigazaurRule } from './power/GigazaurRule'
import { MekaDragonRule } from './power/MekaDragonRule'
import { PowerRule } from './power/PowerRule'
import { SpacePenguinRule } from './power/SpacePenguinRule'
import { TheKingRule } from './power/TheKingRule'
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
    if (!this.getResolveMoves().length) return [this.startRule(RuleId.AfterDiceResolution)]
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = super.getPlayerMoves()
    moves.push(...this.getResolveMoves())
    return moves
  }

  getResolveMoves() {
    const moves: MaterialMove[] = []
    if (this.canGainEnergy()) moves.push(this.customMove(CustomMoveType.ChooseDiceFace, DiceFace.Energy))
    if (this.canSmash()) moves.push(this.customMove(CustomMoveType.ChooseDiceFace, DiceFace.Claw))
    if (this.canPullFame()) moves.push(this.customMove(CustomMoveType.ChooseDiceFace, DiceFace.Fame))
    if (this.canPullDestruction()) moves.push(this.customMove(CustomMoveType.ChooseDiceFace, DiceFace.Destruction))
    if (this.canHeal()) moves.push(this.customMove(CustomMoveType.ChooseDiceFace, DiceFace.Heal))
    if (this.getMonsterPower().canUsePower()) moves.push(this.customMove(CustomMoveType.ChooseDiceFace, DiceFace.Power))
    return moves
  }

  canHeal() {
    return !this.isAlreadyConsumed(DiceFace.Heal) && this.getEffect(DiceFace.Heal) !== undefined
  }

  canPullDestruction() {
    return !this.isAlreadyConsumed(DiceFace.Destruction) && this.getEffect(DiceFace.Destruction) !== undefined
  }

  canPullFame() {
    return !this.isAlreadyConsumed(DiceFace.Fame) && this.getEffect(DiceFace.Fame) !== undefined
  }

  canGainEnergy() {
    return !this.isAlreadyConsumed(DiceFace.Energy) && this.getEffect(DiceFace.Energy) !== undefined
  }

  canSmash() {
    return !this.isAlreadyConsumed(DiceFace.Claw) && this.getEffect(DiceFace.Claw) !== undefined
  }

  getEffect(dice: DiceFace) {
    switch (dice) {
      case DiceFace.Energy:
        return this.buildEffect(EffectType.GainEnergy, DiceFace.Energy)
      case DiceFace.Claw:
        return this.buildEffect(EffectType.Smash, DiceFace.Claw, this.rival)!
      case DiceFace.Heal:
        return this.buildEffect(EffectType.Heal, DiceFace.Heal)!
      case DiceFace.Fame:
        return this.buildEffect(EffectType.PullPawn, DiceFace.Fame)!
      case DiceFace.Destruction:
        return this.buildEffect(EffectType.PullPawn, DiceFace.Destruction)!
    }

    return
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (!isCustomMoveType(CustomMoveType.ChooseDiceFace)(move)) return []
    this.consumeFaces(move.data)
    const effect = this.getEffect(move.data)
    switch (move.data as DiceFace) {
      case DiceFace.Energy:
      case DiceFace.Claw:
      case DiceFace.Heal:
      case DiceFace.Fame:
      case DiceFace.Destruction:
        this.pushEffect(effect!)
        break
      case DiceFace.Power:
        return [this.startRule(this.getMonsterRuleId())]
    }

    if (this.effects.length) {
      return [this.startRule(RuleId.Effect)]
    }

    return [this.startRule(RuleId.AfterDiceResolution)]

  }

  getMonsterRuleId() {
    switch (this.player as Monster) {
      case Monster.Alienoid:
        return RuleId.Alienoid
      case Monster.CyberKitty:
        return RuleId.CyberKitty
      case Monster.Gigazaur:
        return RuleId.Gigazaur
      case Monster.SpacePenguin:
        return RuleId.SpacePenguin
      case Monster.TheKing:
        return RuleId.TheKing
      case Monster.MekaDragon:
        return RuleId.MekaDragon
    }
  }

  getMonsterPower(): PowerRule {
    switch (this.player as Monster) {
      case Monster.Alienoid:
        return new AlienoidRule(this.game)
      case Monster.CyberKitty:
        return new CyberKittyRule(this.game)
      case Monster.Gigazaur:
        return new GigazaurRule(this.game)
      case Monster.SpacePenguin:
        return new SpacePenguinRule(this.game)
      case Monster.TheKing:
        return new TheKingRule(this.game)
      case Monster.MekaDragon:
        return new MekaDragonRule(this.game)
    }
  }

  buildEffect(type: EffectType, face: DiceFace, target: Monster = this.player): EffectWithSource | undefined {
    const sources = this.getSourcesOfDiceFace(face)

    const effectWithSource: EffectWithSource = {
      sources: sources,
      effect: {
        type: type,
        count: sumBy(sources, (source) => source.count ?? 0),
        rival: target !== this.player
      },
      target: target
    }


    if (face === DiceFace.Fame || face === DiceFace.Destruction) {
      effectWithSource.effect.pawn = face === DiceFace.Fame ? Pawn.Fame : Pawn.Destruction
      effectWithSource.effect.count -= 2
    }

    if (effectWithSource.effect.count > 0) {
      if (face === DiceFace.Heal) {
        effectWithSource.effect.count = new HealHelper(this.game, this.player).heal(effectWithSource.effect.count)
        if (!effectWithSource.effect.count) return
      }

      return effectWithSource
    }

    return
  }

  getSourcesOfDiceFace(face: DiceFace) {
    const sources: Source[] = []
    const rollHelper = new RollHelper(this.game)

    const dice = rollHelper.getDiceWithFace(face)
    sources.push({
      type: MaterialType.Dice,
      indexes: dice.getIndexes(),
      count: dice.length
    })

    sources.push(...new KeepHelper(this.game).getBonusFaces(face))

    const extraDice = rollHelper.countExtraDice(face)
    if (extraDice > 0) {
      sources.push({
        type: MaterialType.MonsterBoard,
        indexes: this.material(MaterialType.MonsterBoard).player(this.player).getIndexes(),
        count: extraDice
      })
    }

    return sources
  }

  consumeFaces(face: DiceFace) {
    this.memorize(Memory.DiceFacesSolved, (faces: DiceFace[] = []) => {
      faces.push(face)
      return faces
    })
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