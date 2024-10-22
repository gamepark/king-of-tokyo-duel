import { MaterialRulesPart } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { Monster } from '../material/Monster'
import { Pawn, pawns } from '../material/Pawn'

export class GameOverRule extends MaterialRulesPart {
  isWinner(player: Monster) {
    return this.isDead(this.game.players.find(p => p !== player)!)
      || pawns.some(pawn => this.isPawnInSpotlightZone(pawn, player))
      || this.isPawnOnVictorySpace(player)
  }

  isDead(player: Monster) {
    return this.material(MaterialType.HealthCounter).player(player).getItem()!.location.rotation === 0
  }

  isPawnInSpotlightZone(pawn: Pawn, player?: Monster) {
    return this.material(MaterialType.Pawn).id(pawn).location(({ x = 0 }) => {
        if (player === this.game.players[0]) {
          return -5 <= x && x <= -3
        } else if (player === this.game.players[1]) {
          return 3 <= x && x <= 5
        } else {
          return 3 <= Math.abs(x) && Math.abs(x) <= 5
        }
      }
    )
  }

  isPawnOnVictorySpace(player: Monster) {
    const victorySpace = player === this.game.players[0] ? -7 : 7
    return this.material(MaterialType.Pawn).location(l => l.x === victorySpace).length !== 0
  }
}