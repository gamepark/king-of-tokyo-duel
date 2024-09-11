import { LocationType } from '@gamepark/king-of-tokyo-duel/material/LocationType'
import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { MonsterBoard } from '@gamepark/king-of-tokyo-duel/material/MonsterBoard'
import { Locator } from '@gamepark/react-game'
import { destructionPawnTrackLocator } from './DestructionPawnTrackLocator'
import { energyCardDeckLocator } from './EnergyCardDeckLocator'
import { energyCardOnBoardLocator } from './EnergyCardOnBoardLocator'
import { famePawnTrackLocator } from './FamePawnTrackLocator'
import { healthCounterLocator } from './HealthCounterLocator'
import { monsterBoardLocator } from './MonsterBoardLocator'

export const Locators: Partial<Record<LocationType, Locator<MonsterBoard, MaterialType, LocationType>>> = {
  [LocationType.MonsterBoard]: monsterBoardLocator,
  [LocationType.EnergyCardOnBoard]: energyCardOnBoardLocator,
  [LocationType.EnergyCardDeck]: energyCardDeckLocator,
  [LocationType.HealthCounter]: healthCounterLocator,
  [LocationType.FameTrack]: famePawnTrackLocator,
  [LocationType.DestructionTrack]: destructionPawnTrackLocator
}
