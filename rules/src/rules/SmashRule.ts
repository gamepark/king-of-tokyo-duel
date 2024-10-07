import { isMoveItemType, ItemMove } from '@gamepark/rules-api'
import { DiceFace } from '../material/DiceFace'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurnRule } from './BasePlayerTurnRule'
import { KeepHelper } from './helper/KeepHelper'
import { SmashHelper } from './helper/SmashHelper'
import { isChangingRule } from './IsChangingRule'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class SmashRule extends BasePlayerTurnRule {
  onRuleStart() {
    const claws = this.claws
    const smash = new SmashHelper(this.game, this.rival).smash(MaterialType.Dice, claws.getIndexes(), this.countClaws)
    if (!smash.length) return [this.startRule(RuleId.ResolveDice)]
    return smash
  }

  afterItemMove(move: ItemMove) {
    const moves = super.afterItemMove(move)
    if (moves.some(isChangingRule)) return moves
    if (!isMoveItemType(MaterialType.HealthCounter)(move)) return moves
    const wheel = this.opponentCounter.getItem()!
    if (wheel.location.rotation === 0) return [this.endGame()]
    moves.push(this.startRule(RuleId.ResolveDice))

    return moves
  }

  get rival() {
    return this.game.players.find((p) => p !== this.player)!
  }

  get opponentCounter() {
    return this
      .material(MaterialType.HealthCounter)
      .player((p) => p !== this.player)
  }

  get dice() {
    return this
      .material(MaterialType.Dice)
      .location(LocationType.PlayerRolledDice)
      .player(this.player)
  }

  get claws() {
    return this
      .dice
      .rotation(DiceFace.Claw)
  }

  get countClaws() {
    return this.claws.length +
      new KeepHelper(this.game).bonusDiceFaces.filter((f) => f === DiceFace.Claw).length
  }

  onRuleEnd() {
    this.memorize(Memory.DiceFacesSolved, (faces: DiceFace[] = []) => {
      faces.push(DiceFace.Claw)
      return faces
    })
    return []
  }
}