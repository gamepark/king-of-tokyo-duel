import { MaterialGame } from '@gamepark/rules-api/dist/material/MaterialGame'
import { MaterialRulesPart } from '@gamepark/rules-api/dist/material/rules/MaterialRulesPart'
import { PowerCard } from '../../material/cards/PowerCard'
import { powerCardCharacteristics } from '../../material/cards/PowerCardCharacteristics'
import { Timing } from '../../material/cards/Timing'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Monster } from '../../material/Monster'

export class BuyCardHelper extends MaterialRulesPart {

  constructor(game: MaterialGame, readonly player: Monster) {
    super(game)
  }

  placeBoughtCard() {
    const boughtCard = this
      .material(MaterialType.PowerCard)
      .location(LocationType.BuyArea)

    if (boughtCard.length) {
      return boughtCard
        .moveItems((item) => {
          if (powerCardCharacteristics[item.id as PowerCard].timing === Timing.Discard) {
            return {
              type: LocationType.Discard
            }
          } else {
            return {
              type: LocationType.PlayerKeepCards,
              player: this.player
            }
          }
        })
    }

    return []

  }
}