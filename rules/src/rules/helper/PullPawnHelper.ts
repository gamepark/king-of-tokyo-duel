import { MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { MaterialType } from '../../material/MaterialType'
import { Monster } from '../../material/Monster'
import { Pawn } from '../../material/Pawn'
import { KeepHelper } from './KeepHelper'

export class PullPawnHelper extends MaterialRulesPart {

  constructor(game: MaterialGame, readonly player: Monster) {
    super(game);
  }

  pull(pawnType: Pawn, count: number) {
    // TODO: sometime pull can trigger smash
    const pawn = this.getPawn(pawnType)
    const isLeft = this.game.players[0] === this.player
    if (count) {
      const item = pawn.getItem()!
      const newX = isLeft? Math.max(0, item.location.x! - (count * 2)): Math.min(28, item.location.x! + (count * 2))

      if (item.location.x === newX) return []
      return [
        pawn
          .moveItem((item) => ({ ...item.location, x: newX }))
      ]
    }

    return []
  }

  doPull(pawnType: Pawn, count: number) {
    return [
      ...this.pull(pawnType, count),
      ...this.afterPullPawn(pawnType, count)
    ]
  }

  afterPullPawn(pawn: Pawn, count: number): MaterialMove[] {
    return new KeepHelper(this.game).afterPullPawn(pawn, count)
  }

  getPawn(pawn: Pawn) {
    return this.material(MaterialType.Pawn).id(pawn)
  }
}