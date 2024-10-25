import { getEnumValues } from '@gamepark/rules-api'

export enum DiceFace {
  Claw,
  Destruction,
  Energy,
  Heal,
  Power,
  Fame,
}

export const diceFaces = getEnumValues(DiceFace)
