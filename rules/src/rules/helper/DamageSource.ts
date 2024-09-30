import { MaterialType } from '../../material/MaterialType'
import { Monster } from '../../material/Monster'

export type DamageSource = {
  indexes: number[]
  type: MaterialType
  player: Monster,
  damages: number
}