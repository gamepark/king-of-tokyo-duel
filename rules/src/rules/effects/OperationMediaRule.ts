import { PowerCard } from '../../material/cards/PowerCard'
import { DiceFace } from '../../material/DiceFace'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Pawn } from '../../material/Pawn'
import { BasePlayerTurnRule } from '../BasePlayerTurnRule'
import { KeepHelper } from '../helper/KeepHelper'
import { RuleId } from '../RuleId'
import { EffectType } from './EffectType'

export class OperationMediaRule extends BasePlayerTurnRule {
  onRuleStart() {
    this.unshiftEffect({
      effect: {
        type: EffectType.PullPawn,
        pawn: Pawn.Fame,
        count: this.countClaws
      },
      sources: [{
        type: MaterialType.PowerCard,
        indexes: [this.material(MaterialType.PowerCard).id(PowerCard.OperationMedia).getIndex()]
      }],
      target: this.player
    })
    
    return [this.startRule(RuleId.Effect)]
  }

  get countClaws() {
    return this.rolledDice.length
      + new KeepHelper(this.game).getBonusFaces(DiceFace.Claw).length
  }

  get rolledDice() {
    return this
      .material(MaterialType.Dice)
      .location(LocationType.PlayerRolledDice)
      .player(this.player)
      .rotation(DiceFace.Claw)
  }
}