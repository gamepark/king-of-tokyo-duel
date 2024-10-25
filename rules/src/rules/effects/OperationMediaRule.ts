import { PowerCard } from '../../material/cards/PowerCard'
import { DiceFace } from '../../material/DiceFace'
import { MaterialType } from '../../material/MaterialType'
import { Pawn } from '../../material/Pawn'
import { BasePlayerTurnRule } from '../BasePlayerTurnRule'
import { RollHelper } from '../helper/RollHelper'
import { RuleId } from '../RuleId'
import { EffectType } from './EffectType'

export class OperationMediaRule extends BasePlayerTurnRule {
  onRuleStart() {
    const smash = new RollHelper(this.game).countFace(DiceFace.Claw)
    this.unshiftEffect({
      effect: {
        type: EffectType.PullPawn,
        pawn: Pawn.Fame,
        count: smash
      },
      sources: [{
        type: MaterialType.PowerCard,
        indexes: this.material(MaterialType.PowerCard).id(PowerCard.OperationMedia).getIndexes(),
          count: smash
      }],
      target: this.player
    })

    return [this.startRule(RuleId.Effect)]
  }
}