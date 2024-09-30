import { MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Monster } from '../../material/Monster'

export class EnergyHelper extends MaterialRulesPart {

  constructor(game: MaterialGame, readonly player: Monster) {
    super(game);
  }

  gain(count: number) {
    const moves: MaterialMove[] = [
      this.material(MaterialType.Energy).createItem({
        location: {
          type: LocationType.PlayerEnergy,
          player: this.player
        },
        quantity: count
      }),
    ]
    return moves
  }
}