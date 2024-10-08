import { MaterialType } from '../../material/MaterialType'
import { Monster } from '../../material/Monster'
import { Effect } from './EffectType'

export type Source = {
  items: { type: MaterialType, indexes: number[], count?: number }[],
}

export type EffectWithSource<E extends Effect = any> = {
  sources: { type: MaterialType, indexes: number[], count?: number }[],
  target: Monster,
  effect: E
}