import { MaterialMove } from '@gamepark/rules-api'
import { Monster } from '../../../material/Monster'
import { DamageContext } from '../../helper/DamageContext'
import { Memory } from '../../Memory'
import { RuleId } from '../../RuleId'
import { KeepRule } from '../KeepRule'

export class CamouflageKeepRule extends KeepRule {
  beforeSmashTaken(player: Monster, source: DamageContext): MaterialMove[] {
    if (player !== this.cardPlayer) return []
    if (this.camouflagePreventedDamages !== undefined) return []
    this.memorize(Memory.SuspendedDamages, source)
    return [this.startRule(RuleId.Camouflage)]
  }

  get camouflagePreventedDamages() {
    return this.remind(Memory.CamouflageRolledDiceCount) ?? 0
  }


}