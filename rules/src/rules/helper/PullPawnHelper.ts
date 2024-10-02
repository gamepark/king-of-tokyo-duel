import { MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { MaterialType } from '../../material/MaterialType'
import { Monster } from '../../material/Monster'
import { Pawn } from '../../material/Pawn'

export class PullPawnHelper extends MaterialRulesPart {

  constructor(game: MaterialGame, readonly player: Monster) {
    super(game);
  }

  pull(pawnType: Pawn, count: number) {
    const pawn = this.getPawn(pawnType)
    const isLeft = this.game.players[0] === this.player
    if (count) {
      const item = pawn.getItem()!
      const newX = isLeft? Math.max(-7, item.location.x! - count): Math.min(7, item.location.x! + count)

      if (item.location.x === newX) return []
      const moves: MaterialMove[] = []
      moves.push(
        pawn
          .moveItem((item) => ({ ...item.location, x: newX }))
      )

      if (Math.abs(newX) === 7) moves.push(this.endGame())
      return moves
    }

    return []
  }

  getPawn(pawn: Pawn) {
    return this.material(MaterialType.Pawn).id(pawn)
  }
}