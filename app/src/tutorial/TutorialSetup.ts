import { KingOfTokyoDuelSetup } from '@gamepark/king-of-tokyo-duel/KingOfTokyoDuelSetup'
import { PowerCard } from '@gamepark/king-of-tokyo-duel/material/cards/PowerCard'
import { LocationType } from '@gamepark/king-of-tokyo-duel/material/LocationType'
import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'

export class TutorialSetup extends KingOfTokyoDuelSetup {
  setupDeck() {
    super.setupDeck()
    this.material(MaterialType.PowerCard).id(PowerCard.Monumental).moveItem({ type: LocationType.PowerCardDeck })
  }
}