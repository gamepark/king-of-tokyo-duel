import { getEnumValues } from '@gamepark/rules-api'

export enum Buzz {
  //
  Buzz1 = 1,
  Buzz2,
  TheKingBuzz,
  Buzz4,
  Buzz5,
  Buzz6,
  Buzz7,
  Buzz8,
  Buzz9,
  Buzz10,
  Buzz11,
  Buzz12,
}

export const allBuzz = getEnumValues(Buzz)
export const commonBuzz = allBuzz.filter((buzz) => buzz !== Buzz.TheKingBuzz)
export const theKingBuzz = allBuzz.find((buzz) => buzz === Buzz.TheKingBuzz)