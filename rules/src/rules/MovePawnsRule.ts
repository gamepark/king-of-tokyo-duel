import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { DiceFace } from '../material/DiceFace'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Pawn } from '../material/Pawn'
import { RuleId } from './RuleId'

export class MovePawnsRule extends PlayerTurnRule {
  onRuleStart() {
    const moves: MaterialMove[] = []
    moves.push(...this.moveFame())
    moves.push(...this.moveDestruction())
    moves.push(this.startRule(RuleId.Buy))

    return moves
  }

  moveFame() {
    const fameDice = this.fameDice
    const fameToken = this.fameToken
    const isLeft = this.game.players[0] === this.player
    const fameCount = fameDice > 3? (fameDice % 3 + 1): 0
    if (fameCount) {
      const item = fameToken.getItem()!
      const newX = isLeft? Math.max(0, item.location.x! - (fameCount * 2)): Math.min(28, item.location.x! + (fameCount * 2))

      if (item.location.x === newX) return []
      return [
        fameToken
          .moveItem((item) => ({ ...item.location, x: newX }))
      ]
    }

    return []
  }

  moveDestruction() {
    const destructionDice = this.destructionDice
    const destructionToken = this.destructionToken
    const isLeft = this.game.players[0] === this.player
    const destructionCount = destructionDice > 3? (destructionDice % 3 + 1): 0
    if (destructionCount) {
      const item = destructionToken.getItem()!
      const newX = isLeft? Math.max(0, item.location.x! - (destructionCount * 2)): Math.min(28, item.location.x! + (destructionCount * 2))

      if (item.location.x === newX) return []
      return [
        destructionToken
          .moveItem((item) => ({ ...item.location, x: newX }))
      ]
    }

    return []
  }

  get fameToken() {
    return this.material(MaterialType.Pawn).id(Pawn.Fame)
  }

  get destructionToken() {
    return this.material(MaterialType.Pawn).id(Pawn.Destruction)
  }

  get fameDice() {
    return this.dice
      .rotation(DiceFace.Star)
      .length
  }

  get destructionDice() {
    return this.dice
      .rotation(DiceFace.Destruction)
      .length
  }

  get dice() {
    return this
      .material(MaterialType.Dice)
      .location(LocationType.PlayerRolledDice)
      .player(this.player)
  }
}