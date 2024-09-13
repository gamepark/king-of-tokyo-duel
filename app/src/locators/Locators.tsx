import { LocationType } from '@gamepark/king-of-tokyo-duel/material/LocationType'
import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { Monster } from '@gamepark/king-of-tokyo-duel/material/Monster'
import { Locator } from '@gamepark/react-game'
import { buzzStockLocator } from './BuzzStockLocator'
import { destructionPawnTrackLocator } from './DestructionPawnTrackLocator'
import { diceStockLocator } from './DiceStockLocator'
import { energyCardDeckLocator } from './EnergyCardDeckLocator'
import { energyCardOnBoardLocator } from './EnergyCardOnBoardLocator'
import { energyStockLocator } from './EnergyStockLocator'
import { famePawnTrackLocator } from './FamePawnTrackLocator'
import { healthCounterLocator } from './HealthCounterLocator'
import { monsterBoardLocator } from './MonsterBoardLocator'
import { playerBuzzLocator } from './PlayerBuzzLocator'
import { playerEnergyLocator } from './PlayerEnergyLocator'
import { playerHandLocator } from './PlayerHandLocator'
import { playerRolledDiceLocator } from './PlayerRolledDiceLocator'
import { whiteDiceStockLocator } from './WhiteDiceStockLocator'

export const Locators: Partial<Record<LocationType, Locator<Monster, MaterialType, LocationType>>> = {
  [LocationType.MonsterBoard]: monsterBoardLocator,
  [LocationType.EnergyCardOnBoard]: energyCardOnBoardLocator,
  [LocationType.EnergyCardDeck]: energyCardDeckLocator,
  [LocationType.HealthCounter]: healthCounterLocator,
  [LocationType.FameTrack]: famePawnTrackLocator,
  [LocationType.DestructionTrack]: destructionPawnTrackLocator,
  [LocationType.BuzzStock]: buzzStockLocator,
  [LocationType.PlayerHand]: playerHandLocator,
  [LocationType.PlayerRolledDice]: playerRolledDiceLocator,
  [LocationType.DiceStock]: diceStockLocator,
  [LocationType.EnergyStock]: energyStockLocator,
  [LocationType.PlayerBuzzToken]: playerBuzzLocator,
  [LocationType.WhiteDiceStock]: whiteDiceStockLocator,
  [LocationType.PlayerEnergy]: playerEnergyLocator
}
