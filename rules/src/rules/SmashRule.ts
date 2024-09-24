import { CustomMove, PlayerTurnRule } from '@gamepark/rules-api'
import { DiceFace } from '../material/DiceFace'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { SmashHelper } from './helper/SmashHelper'
import { RuleId } from './RuleId'

export class SmashRule extends PlayerTurnRule {

  onRuleStart() {
    const claws = this.claws
    if (!claws.length) return [this.startRule(RuleId.MovePawns)]
    return new SmashHelper(this.game, this.rival).smash(MaterialType.Dice, claws.getIndexes(), claws.length)
  }

  onCustomMove(move: CustomMove) {
    return [
      ...new SmashHelper(this.game, this.rival).onSmash(move.data.damages),
      this.startRule(RuleId.MovePawns)
    ]
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