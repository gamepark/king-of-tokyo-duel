import { getEnumValues, MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { DiceFace } from '../../material/DiceFace'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Monster } from '../../material/Monster'
import { Pawn } from '../../material/Pawn'
import { DamageContext } from '../helper/DamageContext'
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

  get additionalDice(): number {
    return 0;
  }

  get additionalRolls(): number {
    return 0;
  }

  atEndOfTurn(): MaterialMove[] {
    return []
  }

  afterResolvingDice(): MaterialMove[] {
    return []
  }

  canReroll(_face: DiceFace): boolean {
    return false
  }

  afterRollingDice(): MaterialMove[] {
    return []
  }

  afterPullPawn(_pawn: Pawn, _count: number): MaterialMove[] {
    return []
  }

  beforeSmashTaken(_player: Monster, _source: DamageContext): MaterialMove[] {
    return []
  }

  afterSmashTakenComputed(_player: Monster, _damages: number): MaterialMove[] {
    return []
  }

  ignoredSmash(_player: Monster, _damages?: number): number {
    return 0
  }

  immune(_player: Monster, _damages: number): boolean {
    return false
  }

  // TODO: replace number by effect type
  get buzzBonusAlternatives(): number | undefined {
    return
  }

  get allowedMovesDuringTurn(): MaterialMove[] {
    return []
  }

  onBuyPowerCard(): MaterialMove[] {
    return []
  }

  get healBonus(): number {
    return 0
  }

  get bonusDiceFaces(): DiceFace[] {
    return []
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

  get rolledDice() {
    return this
      .material(MaterialType.Dice)
      .location(LocationType.PlayerRolledDice)
      .player(this.cardPlayer)
  }
}