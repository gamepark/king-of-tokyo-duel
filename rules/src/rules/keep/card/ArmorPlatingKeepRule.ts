import { CustomMove, isCustomMoveType } from '@gamepark/rules-api/dist/material/moves/CustomMove'
import { PowerCard } from '../../../material/cards/PowerCard'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { Monster } from '../../../material/Monster'
import { CustomMoveType } from '../../CustomMoveType'
import { KeepRule } from '../KeepRule'

// TODO : Prevent damages
export class ArmorPlatingKeepRule extends KeepRule {
  ignoredSmash(player: Monster): number {
    if (this.isConsumed || player !== this.cardPlayer) return 0
    return 1
  }

  hasTrendSetter(player: Monster): boolean {
    const trendSetter = this.material(MaterialType.PowerCard)
      .location(LocationType.PlayerKeepCards)
      .player(player)
      .id(PowerCard.TrendSetter)

    if (!trendSetter.length) return false
    return !this.keepCardConsumed.includes(trendSetter.getIndex())
  }

  onCustomMove(move: CustomMove) {
    if (!isCustomMoveType(CustomMoveType.Smash)(move)) return []
    const prevented = move.data.preventedDamages ?? 0
    if (!prevented) return []
    if (prevented === 1 && this.hasTrendSetter(move.data.player)) return []
    this.markKeepCardConsumed()
    return []
  }
}