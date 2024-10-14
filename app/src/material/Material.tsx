import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { buzzTokenDescription } from './BuzzTokenDescription'
import { diceTokenDescription } from './DiceTokenDescription'
import { powerCardDescription } from './PowerCardDescription'
import { energyTokenDescription } from './EnergyTokenDescription'
import { healthCounterDescription } from './HealthCounterDescription'
import { mainBoardDescription } from './MainBoardDescription'
import { monsterBoardDescription } from './MonsterBoardDescription'
import { pawnDescription } from './PawnDescription'
import { diceDescription } from './DiceDescription'

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
