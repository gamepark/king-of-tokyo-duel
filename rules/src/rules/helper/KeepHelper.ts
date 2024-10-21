import { ItemMove, Material, MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import sumBy from 'lodash/sumBy'
import { PowerCard } from '../../material/cards/PowerCard'
import { DiceFace } from '../../material/DiceFace'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Monster } from '../../material/Monster'
import { Pawn } from '../../material/Pawn'
import { EffectWithSource, Source } from '../effects/EffectWithSource'
import { AcidAttackKeepRule } from '../keep/card/AcidAttackKeepRule'
import { AdrenalineAugmentKeepRule } from '../keep/card/AdrenalineAugmentKeepRule'
import { AlienMetabolismKeepRule } from '../keep/card/AlienMetabolismKeepRule'
import { AntimatterPelletsKeepRule } from '../keep/card/AntimatterPelletsKeepRule'
import { ArmorPlatingKeepRule } from '../keep/card/ArmorPlatingKeepRule'
import { BreakingNewsKeepRule } from '../keep/card/BreakingNewsKeepRule'
import { CamouflageKeepRule } from '../keep/card/CamouflageKeepRule'
import { ElectricalAuraKeepRule } from '../keep/card/ElectricalAuraKeepRule'
import { ExtraHeadKeepRule } from '../keep/card/ExtraHeadKeepRule'
import { EyeOfTheStormKeepRule } from '../keep/card/EyeOfTheStormKeepRule'
import { GentleGiantKeepRule } from '../keep/card/GentleGiantKeepRule'
import { GiantBrainKeepRule } from '../keep/card/GiantBrainKeepRule'
import { HibernationKeepRule } from '../keep/card/HibernationKeepRule'
import { InShapeKeepRule } from '../keep/card/InShapeKeepRule'
import { InTheShadowsKeepRule } from '../keep/card/InTheShadowsKeepRule'
import { LightningSpeedKeepRule } from '../keep/card/LightningSpeedKeepRule'
import { MadeInALabKeepRule } from '../keep/card/MadeInALabKeepRule'
import { NaturalSelectionKeepRule } from '../keep/card/NaturalSelectionKeepRule'
import { RegenerationKeepRule } from '../keep/card/RegenerationKeepRule'
import { ScrappyKeepRule } from '../keep/card/ScrappyKeepRule'
import { SignatureMoveKeepRule } from '../keep/card/SignatureMoveKeepRule'
import { SpikedTailKeepRule } from '../keep/card/SpikedTailKeepRule'
import { SuperConductorKeepRule } from '../keep/card/SuperConductorKeepRule'
import { ThunderStompKeepRule } from '../keep/card/ThunderStompKeepRule'
import { TitanicBatteriesKeepRule } from '../keep/card/TitanicBatteriesKeepRule'
import { TrendSetterKeepRule } from '../keep/card/TrendSetterKeepRule'
import { UnchainedKeepRule } from '../keep/card/UnchainedKeepRule'
import { UnstableDnaKeepRule } from '../keep/card/UnstableDnaKeepRule'
import { UnstoppableKeepRule } from '../keep/card/UnstoppableKeepRule'
import { UtterDestructionKeepRule } from '../keep/card/UtterDestructionKeepRule'
import { KeepRule } from '../keep/KeepRule'

export class KeepHelper extends MaterialRulesPart {
  private keepCards: Material
  private keepCardsIndexes: number[]

  constructor(game: MaterialGame) {
    super(game)
    this.keepCards = this
      .material(MaterialType.PowerCard)
      .location(LocationType.PlayerKeepCards)

    this.keepCardsIndexes = this.keepCards.getIndexes()

  }

  getEffectRule(index: number): KeepRule | undefined {
    const EffectRule = keepEffects[this.keepCards.getItem<PowerCard>(index).id]
    if (!EffectRule) return
    return new EffectRule(this.game, index)
  }

  onDie(player: Monster): MaterialMove[] {
    return this.keepCardsIndexes
      .flatMap((index) => this.getEffectRule(index)?.onDie(player) ?? [])
  }

  onHeal(): number {
    return sumBy(this.keepCardsIndexes, (index) => this.getEffectRule(index)?.onHeal() ?? 0)
  }

  atStartOfTurn(): MaterialMove[] {
    return this.keepCardsIndexes
      .flatMap((index) => this.getEffectRule(index)?.atStartOfTurn() ?? [])
  }

  atStartOfResolving(): MaterialMove[] {
    return this.keepCardsIndexes
      .flatMap((index) => this.getEffectRule(index)?.atStartOfResolving() ?? [])
  }

  get additionalDice(): number {
    return sumBy(this.keepCardsIndexes, (index) => this.getEffectRule(index)?.additionalDice ?? 0)
  }

  get additionalRolls(): number {
    return sumBy(this.keepCardsIndexes, (index) => this.getEffectRule(index)?.additionalRolls ?? 0)
  }

  atEndOfTurn() {
    this.keepCardsIndexes
      .forEach((index) => this.getEffectRule(index)?.atEndOfTurn())
  }

  afterResolvingDice() {
    return this.keepCardsIndexes
      .flatMap((index) => this.getEffectRule(index)?.afterResolvingDice() ?? [])
  }

  afterResolvingDiceFace(dice: DiceFace) {
    return this.keepCardsIndexes
      .flatMap((index) => this.getEffectRule(index)?.afterResolvingDiceFace(dice) ?? [])
  }

  beforeResolvingDice() {
    return this.keepCardsIndexes
      .flatMap((index) => this.getEffectRule(index)?.beforeResolvingDice() ?? [])
  }

  canReroll(face: DiceFace): boolean {
    return this.keepCardsIndexes
      .some((index) => this.getEffectRule(index)?.canReroll(face))
  }

  afterRollingDice() {
    this.keepCardsIndexes
      .forEach((index) => this.getEffectRule(index)?.afterRollingDice())
  }

  afterPullPawn(pawn: Pawn) {
    this.keepCardsIndexes
      .forEach((index) => this.getEffectRule(index)?.afterPullPawn(pawn))
  }

  canPreventDamagesOn(target: Monster): boolean {
    return this.keepCardsIndexes
      .some((index) => this.getEffectRule(index)?.canPreventDamagesOn(target) ?? false)
  }

  getPreventKeepEffects(target: Monster) {
    return this.keepCards
      .filter((_, index) => this.getEffectRule(index)?.canPreventDamagesOn(target) ?? false)
      .getIndexes()
      .sort(index => this.getEffectRule(index)!.preventionOrder)
      .map((i) => this.getEffectRule(i)!)
  }

  afterSmashTakenComputed(player: Monster, takenDamages: number) {
    this.keepCardsIndexes
      .flatMap((index) => this.getEffectRule(index)?.afterSmashTakenComputed(player, takenDamages) ?? [])
  }

  immune(player: Monster): boolean {
    return this.keepCardsIndexes.some((index) => this.getEffectRule(index)?.immune(player))
  }

  get buzzBonusAlternatives(): EffectWithSource[] {
    return this.keepCardsIndexes
      .flatMap((index) => this.getEffectRule(index)?.buzzBonusAlternatives ?? [])
  }

  get allowedMovesDuringTurn(): MaterialMove[] {
    return this.keepCardsIndexes
      .flatMap((index) => this.getEffectRule(index)?.allowedMovesDuringTurn ?? [])
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    return this.keepCardsIndexes
      .flatMap((index) => this.getEffectRule(index)?.beforeItemMove(move) ?? [])
  }

  onBuyPowerCard() {
    this.keepCardsIndexes
      .forEach((index) => this.getEffectRule(index)?.onBuyPowerCard() ?? [])
  }

  getBonusFaces(face: DiceFace): Source[] {
    return this.keepCardsIndexes
      .flatMap((index) => {
        const bonuses = this.getEffectRule(index)?.getBonusFaces(face)
        if (bonuses) return [bonuses]
        return []
      })
  }


  get player() {
    return this.game.rule!.player!
  }
}

type KeepRuleCreator = new (game: MaterialGame, cardIndex: number) => KeepRule;
const keepEffects: Partial<Record<PowerCard, KeepRuleCreator>> = {
  [PowerCard.AcidAttack]: AcidAttackKeepRule,
  [PowerCard.AdrenalineAugment]: AdrenalineAugmentKeepRule,
  [PowerCard.AlienMetabolism]: AlienMetabolismKeepRule,
  [PowerCard.AntimatterPellets]: AntimatterPelletsKeepRule,
  [PowerCard.ArmorPlating]: ArmorPlatingKeepRule,
  [PowerCard.BreakingNews]: BreakingNewsKeepRule,
  [PowerCard.Camouflage]: CamouflageKeepRule,
  [PowerCard.ElectricalAura]: ElectricalAuraKeepRule,
  [PowerCard.ExtraHead]: ExtraHeadKeepRule,
  [PowerCard.EyeOfTheStorm]: EyeOfTheStormKeepRule,
  [PowerCard.GentleGiant]: GentleGiantKeepRule,
  [PowerCard.GiantBrain]: GiantBrainKeepRule,
  [PowerCard.Hibernation]: HibernationKeepRule,
  [PowerCard.InShape]: InShapeKeepRule,
  [PowerCard.InTheShadows]: InTheShadowsKeepRule,
  [PowerCard.LightingSpeed]: LightningSpeedKeepRule,
  [PowerCard.MadeInALab]: MadeInALabKeepRule,
  [PowerCard.NaturalSelection]: NaturalSelectionKeepRule,
  [PowerCard.Regeneration]: RegenerationKeepRule,
  [PowerCard.Scrappy]: ScrappyKeepRule,
  [PowerCard.SignatureMove]: SignatureMoveKeepRule,
  [PowerCard.SpikedTail]: SpikedTailKeepRule,
  [PowerCard.Superconductor]: SuperConductorKeepRule,
  [PowerCard.ThunderStomp]: ThunderStompKeepRule,
  [PowerCard.TitanicBatteries]: TitanicBatteriesKeepRule,
  [PowerCard.TrendSetter]: TrendSetterKeepRule,
  [PowerCard.Unchained]: UnchainedKeepRule,
  [PowerCard.UnstableDna]: UnstableDnaKeepRule,
  [PowerCard.Unstoppable]: UnstoppableKeepRule,
  [PowerCard.UtterDestruction]: UtterDestructionKeepRule
}