import { CustomMove, getEnumValues, MaterialGame, MaterialMove, MaterialRulesPart, PlayMoveContext } from '@gamepark/rules-api'
import { DiceFace } from '../../material/DiceFace'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Monster } from '../../material/Monster'
import { Pawn } from '../../material/Pawn'
import { Effect } from '../effects/EffectType'
import { EffectWithSource, Source } from '../effects/EffectWithSource'
import { Memory } from '../Memory'

export class KeepRule extends MaterialRulesPart {

  constructor(game: MaterialGame, readonly cardIndex: number) {
    super(game)
  }

  getActivePlayer() {
    return this.game.rule!.player
  }

  atStartOfTurn(): MaterialMove[] {
    return []
  }

  onHeal() {

  }

  onDie(_player: Monster): MaterialMove[] {
    return []
  }

  get additionalDice(): number {
    return 0
  }

  get additionalRolls(): number {
    return 0
  }

  atEndOfTurn() {
    return
  }

  onCustomMove(_move: CustomMove, _context?: PlayMoveContext): MaterialMove<number, number, number>[] {
    return super.onCustomMove(_move, _context)
  }

  afterResolvingDice() {
  }

  afterResolvingDiceFace(_dice: DiceFace) {
  }

  canReroll(_face: DiceFace): boolean {
    return false
  }

  afterRollingDice() {
  }

  atStartOfResolving(): MaterialMove[] {
    return []
  }

  beforeResolvingDice() {
  }

  afterPullPawn(_pawn: Pawn) {
  }

  canPreventDamagesOn(_player: Monster): boolean {
    return false
  }

  preventDamages(): MaterialMove[] {
    return []
  }

  get preventionOrder() {
    return 0
  }

  afterSmashTakenComputed(_player: Monster, _takenDamages: number) {
  }

  ignoredSmash(_player: Monster, _damages?: number): number {
    return 0
  }

  immune(_player: Monster): boolean {
    return false
  }

  // TODO: replace number by effect type
  get buzzBonusAlternatives(): number | undefined {
    return
  }

  get allowedMovesDuringTurn(): MaterialMove[] {
    return []
  }

  onBuyPowerCard() {
  }

  getBonusFaces(_face: DiceFace): (Source & { count: number }) | undefined {
    return
  }

  markKeepCardConsumed() {
    this.memorize(Memory.KeepCardPlayed, (cards: number[]) => {
      if (!cards) return [this.cardIndex]
      cards.push(this.cardIndex)
      return cards
    })
  }

  get keepCardConsumed() {
    return this.remind(Memory.KeepCardPlayed) ?? []
  }

  get isConsumed(): boolean {
    return this.keepCardConsumed.includes(this.cardIndex)
  }

  get card() {
    return this
      .material(MaterialType.PowerCard)
      .getItem(this.cardIndex)!
  }

  get cardPlayer() {
    return this.card.location.player!
  }

  get rival() {
    return this.game.players.find((p) => p !== this.cardPlayer)!
  }

  get maxNumberOfAKind() {
    let count = 0
    const dice = this.rolledDice
    for (const face of getEnumValues(DiceFace)) {
      const faceCount = dice.rotation(face).length
      if (faceCount > count) count = faceCount
    }

    return count
  }

  get effects(): EffectWithSource[] {
    return this.remind<EffectWithSource[]>(Memory.Effects) ?? []
  }

  unshiftEffect(effect: Effect, target: Monster) {
    const effectWithSource = {
      effect,
      sources: [{
        type: MaterialType.PowerCard,
        indexes: [this.cardIndex]
      }],
      target
    }
    this.memorize(Memory.Effects, (effects: EffectWithSource[] = []) => {
      return effects
        .slice(0, 1)
        .concat(effectWithSource)
        .concat(effects.slice(1))
    })
  }

  pushEffect(effect: Effect, target: Monster) {
    const effectWithSource = {
      effect,
      sources: [{
        type: MaterialType.PowerCard,
        indexes: [this.cardIndex]
      }],
      target
    }
    this.memorize(Memory.Effects, (effects: EffectWithSource[] = []) => {
      effects.push(effectWithSource)
      return effects
    })
  }

  get rolledDice() {
    return this
      .material(MaterialType.Dice)
      .location(LocationType.PlayerRolledDice)
      .player(this.cardPlayer)
  }
}