import { PlayerTurnRule } from "@gamepark/rules-api";
import { DiceFace } from '../material/DiceFace'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class SmashRule extends PlayerTurnRule {

  onRuleStart() {
    const claws = this.claws
    if (!claws) return [this.startRule(RuleId.MovePawns)]
    return [
      // TODO: OPPONENT FAILS ?
      this.opponentCounter.rotateItem((item) => Math.max(item.location.rotation - claws, 0)),
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
      .length
  }
}