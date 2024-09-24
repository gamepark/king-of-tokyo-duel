import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { MaterialType } from '../../material/MaterialType'
import { Monster } from '../../material/Monster'
import { CustomMoveType } from '../CustomMoveType'

export class SmashHelper extends MaterialRulesPart {

  constructor(game: MaterialGame, readonly player: Monster) {
    super(game);
  }

  smash(itemType: MaterialType, itemIndexes: number[], damages: number) {
    return [this.customMove(CustomMoveType.Smash, {
      type: itemType,
      player: this.player,
      indexes: itemIndexes,
      damages: damages
    })]
  }

    // TODO: OPPONENT Loose game ?
  onSmash(damages: number) {
    return [
      this.healthWheel.rotateItem((item) => Math.max(item.location.rotation - damages, 0)),
    ]
  }

  get healthWheel() {
    return this
      .material(MaterialType.HealthCounter)
      .player(this.player)
  }
}