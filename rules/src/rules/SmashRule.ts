import { CustomMove, PlayerTurnRule } from '@gamepark/rules-api'
import { DiceFace } from '../material/DiceFace'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { RuleId } from './RuleId'

export class SmashRule extends PlayerTurnRule {

  onRuleStart() {
    const claws = this.claws
    if (!claws.length) return [this.startRule(RuleId.MovePawns)]
    return [this.customMove(CustomMoveType.Smash, {
      type: MaterialType.Dice,
      indexes: claws.getIndexes()
    })]
  }

  onCustomMove(move: CustomMove) {
    return [
      // TODO: OPPONENT FAILS ?
      this.opponentCounter.rotateItem((item) => Math.max(item.location.rotation - move.data.indexes.length, 0)),
      this.startRule(RuleId.MovePawns)
    ]
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