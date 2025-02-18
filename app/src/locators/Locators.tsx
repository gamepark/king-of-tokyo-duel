import { LocationType } from '@gamepark/king-of-tokyo-duel/material/LocationType'
import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { Monster } from '@gamepark/king-of-tokyo-duel/material/Monster'
import { Locator } from '@gamepark/react-game'
import { buyAreaLocator } from './BuyAreaLocator'
import { buzzStockLocator } from './BuzzStockLocator'
import { destructionTrackLocator } from './DestructionTrackLocator'
import { discardLocator } from './DiscardLocator'
import { energyStockLocator } from './EnergyStockLocator'
import { fameTrackLocator } from './FameTrackLocator'
import { healthCounterLocator } from './HealthCounterLocator'
import { monsterBoardLocator } from './MonsterBoardLocator'
import { onPowerCardLocator } from './OnPowerCardLocator'
import { playerBuzzLocator } from './PlayerBuzzLocator'
import { playerDiceKeepLocator } from './PlayerDiceKeepLocator'
import { playerDiceRollLocator } from './PlayerDiceRollLocator'
import { playerDiceTokenLocator } from './PlayerDiceTokenLocator'
import { playerEnergyLocator } from './PlayerEnergyLocator'
import { playerKeepCards } from './PlayerKeepCardsLocator'
import { powerCardBuzzLocator } from './PowerCardBuzzLocator'
import { powerCardCostLocator } from './PowerCardCostLocator'
import { powerCardDeckLocator } from './PowerCardDeckLocator'
import { powerCardOnBoardLocator } from './PowerCardOnBoardLocator'
import { spotlightAreaLocator } from './SpotlightAreaLocator'
import { whiteDiceStockLocator } from './WhiteDiceStockLocator'
import { whiteTokenStockLocator } from './WhiteTokenStockLocator'

export const Locators: Partial<Record<LocationType, Locator<Monster, MaterialType, LocationType>>> = {
  [LocationType.MonsterBoard]: monsterBoardLocator,
  [LocationType.PowerCardOnBoard]: powerCardOnBoardLocator,
  [LocationType.PowerCardDeck]: powerCardDeckLocator,
  [LocationType.HealthCounter]: healthCounterLocator,
  [LocationType.FameTrack]: fameTrackLocator,
  [LocationType.DestructionTrack]: destructionTrackLocator,
  [LocationType.BuzzStock]: buzzStockLocator,
  [LocationType.PlayerDiceRoll]: playerDiceRollLocator,
  [LocationType.PlayerDiceKeep]: playerDiceKeepLocator,
  [LocationType.EnergyStock]: energyStockLocator,
  [LocationType.PlayerBuzzToken]: playerBuzzLocator,
  [LocationType.WhiteDiceStock]: whiteDiceStockLocator,
  [LocationType.PlayerEnergy]: playerEnergyLocator,
  [LocationType.Discard]: discardLocator,
  [LocationType.PlayerKeepCards]: playerKeepCards,
  [LocationType.OnPowerCard]: onPowerCardLocator,
  [LocationType.BuyArea]: buyAreaLocator,
  [LocationType.PlayerDiceToken]: playerDiceTokenLocator,
  [LocationType.WhiteTokenStock]: whiteTokenStockLocator,
  [LocationType.PowerCardCost]: powerCardCostLocator,
  [LocationType.SpotlightArea]: spotlightAreaLocator,
  [LocationType.PowerCardBuzz]: powerCardBuzzLocator
}
