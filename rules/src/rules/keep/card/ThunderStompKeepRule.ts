import { PowerCard } from '../../../material/cards/PowerCard'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { Pawn } from '../../../material/Pawn'
import { Memory, SetDiceOn } from '../../Memory'
import { RuleId } from '../../RuleId'
import { KeepRule } from '../KeepRule'


export class ThunderStompKeepRule extends KeepRule {
  afterPullPawn(pawn: Pawn) {
    if (this.isConsumed) return
    if (this.getActivePlayer() !== this.cardPlayer || pawn !== Pawn.Destruction) return
    if (this.remind(Memory.Phase) !== RuleId.ResolveDice) return
    this.markKeepCardConsumed()
    this.memorize(Memory.SetDiceApart, (dices: SetDiceOn[] = []) => {
      dices.push({
        location: LocationType.OnPowerCard,
        parent: this.material(MaterialType.PowerCard).id(PowerCard.ThunderStomp).getIndex()
      })
      return dices
    })
  }
}