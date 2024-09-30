import { MaterialMove } from '@gamepark/rules-api'
import { Monster } from '../../../material/Monster'
import { DamageSource } from '../../helper/DamageSource'
import { Memory } from '../../Memory'
import { RuleId } from '../../RuleId'
import { KeepRule } from '../KeepRule'

export class CamouflageKeepRule extends KeepRule {
  onSmashTaken(player: Monster, source: DamageSource): MaterialMove[] {
    if (player !== this.cardPlayer) return []
    this.memorize(Memory.SuspendedDamages, source)
    return [this.startRule(RuleId.Camouflage)]
  }
}