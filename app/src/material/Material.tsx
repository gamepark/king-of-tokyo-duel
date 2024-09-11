import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { energyCardDescription } from './EnergyCardDescription'
import { healthCounterDescription } from './HealthCounterDescription'
import { mainBoardDescription } from './MainBoardDescription'
import { monsterBoardDescription } from './MonsterBoardDescription'
import { pawnDescription } from './PawnDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.EnergyCard]: energyCardDescription,
  [MaterialType.MainBoard]: mainBoardDescription,
  [MaterialType.MonsterBoard]: monsterBoardDescription,
  [MaterialType.HealthCounter]: healthCounterDescription,
  [MaterialType.Pawn]: pawnDescription
}
