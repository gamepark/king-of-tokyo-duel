import { isMoveItemType, ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { DiceFace } from '../material/DiceFace'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { SmashHelper } from './helper/SmashHelper'
import { RuleId } from './RuleId'

export class SmashRule extends PlayerTurnRule {
  onRuleStart() {
    const claws = this.claws
    if (!claws.length) return [this.startRule(RuleId.PullPawn)]
    return new SmashHelper(this.game, this.rival).doSmash(MaterialType.Dice, claws.getIndexes(), claws.length)
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.HealthCounter)(move)) return []
    const wheel = this.opponentCounter.getItem()!
    if (wheel.location.rotation === 0) return [this.endGame()]
    return [this.startRule(RuleId.PullPawn)]
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
}