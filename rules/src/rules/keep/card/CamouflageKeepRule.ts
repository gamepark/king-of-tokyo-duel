import { MaterialMove } from '@gamepark/rules-api'
import { Monster } from '../../../material/Monster'
import { RuleId } from '../../RuleId'
import { KeepRule } from '../KeepRule'

export class CamouflageKeepRule extends KeepRule {
  canPreventDamagesOn(player: Monster) {
    return player === this.cardPlayer
  }

  get preventionOrder(): number {
    return 0
  }

  preventDamages(): MaterialMove[] {
    this.markKeepCardConsumed()
    return [this.startRule(RuleId.Camouflage)]
  }
}