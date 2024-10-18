import { PowerCard } from '../../material/cards/PowerCard'
import { MaterialType } from '../../material/MaterialType'
import { Pawn } from '../../material/Pawn'
import { BasePlayerTurnRule } from '../BasePlayerTurnRule'
import { RuleId } from '../RuleId'
import { EffectType } from './EffectType'

export class ThePartyIsOverRule extends BasePlayerTurnRule {
  onRuleStart() {
    const fameInSpotlight = this.isInSpotlightZone(Pawn.Fame)
    if (fameInSpotlight.length) {
      const isLeft = fameInSpotlight.getItem()!.location.x! < 0
      this.pushEffect({
        effect: {
          type: EffectType.Smash,
          count: 4
        },
        sources: [{
          type: MaterialType.PowerCard,
          indexes: this.material(MaterialType.PowerCard).id(PowerCard.ThePartyIsOver).getIndexes(),
          count: 4
        }],
        target: this.game.players[isLeft ? 0 : 1]
      })
    }

    const destructionInSpotlight = this.isInSpotlightZone(Pawn.Destruction)
    if (destructionInSpotlight.length) {
      const isLeft = destructionInSpotlight.getItem()!.location.x! < 0
      this.pushEffect({
        effect: {
          type: EffectType.Smash,
          count: 4
        },
        sources: [{
          type: MaterialType.PowerCard,
          indexes: this.material(MaterialType.PowerCard).id(PowerCard.ThePartyIsOver).getIndexes(),
          count: 4
        }],
        target: this.game.players[isLeft ? 0 : 1]
      })
    }

    return [this.startRule(RuleId.Effect)]
  }


  isInSpotlightZone(pawn: Pawn) {
    return this
      .material(MaterialType.Pawn)
      .id(pawn)
      .location((location) => 5 >= Math.abs(location.x!) && Math.abs(location.x!) >= 3)
  }
}