import { PowerCard } from '../../material/cards/PowerCard'
import { MaterialType } from '../../material/MaterialType'
import { pawns } from '../../material/Pawn'
import { BasePlayerTurnRule } from '../BasePlayerTurnRule'
import { GameOverRule } from '../GameOverRule'
import { RuleId } from '../RuleId'
import { EffectType } from './EffectType'

export class ThePartyIsOverRule extends BasePlayerTurnRule {
  onRuleStart() {
    const gameOverRule = new GameOverRule(this.game)
    for (const player of this.game.players) {
      if (pawns.some(pawn => gameOverRule.isPawnInSpotlightZone(pawn, player))) {
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
          target: player
        })
      }
    }
    return [this.startRule(RuleId.Effect)]
  }
}
