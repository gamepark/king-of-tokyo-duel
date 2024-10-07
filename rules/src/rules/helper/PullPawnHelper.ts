import { MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { MaterialType } from '../../material/MaterialType'
import { Monster } from '../../material/Monster'
import { Pawn } from '../../material/Pawn'
import { CustomMoveType } from '../CustomMoveType'
import { KeepHelper } from './KeepHelper'

export class PullPawnHelper extends MaterialRulesPart {

  constructor(game: MaterialGame, readonly player: Monster) {
    super(game)
  }

  pull(pawnType: Pawn, count: number) {
    const pawn = this.getPawn(pawnType)
    const isLeft = this.game.players[0] === this.player
    const moves: MaterialMove[] = []
    if (count) {
      const item = pawn.getItem()!
      const newX = isLeft ? Math.max(-7, item.location.x! - count) : Math.min(7, item.location.x! + count)

      if (item.location.x === newX) return []
      moves.push(
        this.customMove(CustomMoveType.PullPawn, {
          pawn: pawnType,
          count: count,
          player: this.player
        })
      )
    }

    return moves
  }

  onPullPawn(pawnType: Pawn, count: number) {
    const pawn = this.getPawn(pawnType)
    const isLeft = this.game.players[0] === this.player
    if (count) {
      const item = pawn.getItem()!
      const newX = isLeft ? Math.max(-7, item.location.x! - count) : Math.min(7, item.location.x! + count)

      if (item.location.x === newX) return []
      const moves: MaterialMove[] = []
      moves.push(
        pawn
          .moveItem((item) => ({ ...item.location, x: newX }))
      )

      if (Math.abs(newX) === 7) {
        moves.push(this.endGame())
        return moves
      }

      moves.push(...new KeepHelper(this.game).afterPawnMoved(pawnType, count))

      return moves
    }

    return []

  }

  getPawn(pawn: Pawn) {
    return this.material(MaterialType.Pawn).id(pawn)
  }
}