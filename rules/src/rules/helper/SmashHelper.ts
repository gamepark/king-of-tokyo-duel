import { MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { MaterialType } from '../../material/MaterialType'
import { Monster } from '../../material/Monster'
import { CustomMoveType } from '../CustomMoveType'
import { isChangingRule } from '../IsChangingRule'
import { Memory } from '../Memory'
import { KeepHelper } from './KeepHelper'

export class SmashHelper extends MaterialRulesPart {

  constructor(game: MaterialGame, readonly player: Monster) {
    super(game)
  }

  smash(itemType: MaterialType, itemIndexes: number[], damages: number) {
    const damageContext = {
      type: itemType,
      player: this.player,
      indexes: itemIndexes,
      damages: damages
    }

    const moves: MaterialMove[] = new KeepHelper(this.game).onSmashTaken(this.player, damageContext)
    if (moves.some(isChangingRule)) return moves

    return [this.customMove(CustomMoveType.Smash, {
      type: itemType,
      player: this.player,
      indexes: itemIndexes,
      damages: damages
    })]
  }

  onSmash(damages: number) {
    this.addSmash(damages)
    const wheel = this.healthWheel
    const moves: MaterialMove[] = [
      wheel.rotateItem((item) => Math.max(item.location.rotation - damages, 0)),
    ]

    if (!wheel.getItem()!.location.rotation) {
      moves.push(this.endGame())
      return moves
    }

    moves.push(
      ...new KeepHelper(this.game).afterSmashTakenComputed(this.player, damages)
    )

    return moves
  }

  addSmash(damages: number) {
    this.memorize(this.getActivePlayer() === this.player ? Memory.SmashCount : Memory.RivalSmashCount, (count = 0) => {
      count += damages
      return count
    })
  }

  get healthWheel() {
    return this
      .material(MaterialType.HealthCounter)
      .player(this.player)
  }
}