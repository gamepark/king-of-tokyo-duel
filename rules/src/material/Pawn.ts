import { getEnumValues } from '@gamepark/rules-api'

export enum Pawn {
  Fame = 1,
  Destruction
}

export const pawns = getEnumValues(Pawn)
