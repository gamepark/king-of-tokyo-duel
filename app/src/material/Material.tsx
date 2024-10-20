import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { buzzTokenDescription } from './BuzzTokenDescription'
import { diceDescription } from './DiceDescription'
import { diceTokenDescription } from './DiceTokenDescription'
import { energyTokenDescription } from './EnergyTokenDescription'
import { frenchMonsterBoardDescription } from './FrenchMonsterBoardDescription'
import { frenchPowerCardDescription } from './FrenchPowerCardDescription'
import { healthCounterDescription } from './HealthCounterDescription'
import { mainBoardDescription } from './MainBoardDescription'
import { monsterBoardDescription } from './MonsterBoardDescription'
import { pawnDescription } from './PawnDescription'
import { powerCardDescription } from './PowerCardDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.PowerCard]: powerCardDescription,
  [MaterialType.MainBoard]: mainBoardDescription,
  [MaterialType.MonsterBoard]: monsterBoardDescription,
  [MaterialType.HealthCounter]: healthCounterDescription,
  [MaterialType.Pawn]: pawnDescription,
  [MaterialType.Buzz]: buzzTokenDescription,
  [MaterialType.Dice]: diceDescription,
  [MaterialType.Energy]: energyTokenDescription,
  [MaterialType.DiceToken]: diceTokenDescription
}

export const MaterialI18n: Record<string, Partial<Record<MaterialType, MaterialDescription>>> = {
  'fr': {
    [MaterialType.PowerCard]: frenchPowerCardDescription,
    [MaterialType.MonsterBoard]: frenchMonsterBoardDescription
  }
}
