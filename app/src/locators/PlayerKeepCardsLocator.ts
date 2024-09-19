import { DropAreaDescription, isItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { energyCardDescription } from '../material/EnergyCardDescription'

export class PlayerKeepCardsLocator extends ListLocator {
  gap = { x: -2 }
  getCoordinates(location: Location, context: MaterialContext) {
    let coordinates = this.getAreaCoordinates(location, context)

    if (isItemContext(context)) {
      coordinates.y += this.locationDescription.height / 2 - energyCardDescription.height / 2 - 0.5
    }

    return coordinates
  }

  getAreaCoordinates(location: Location, context: MaterialContext) {
    let coordinates
    if (location.player === context.rules.players[0]) {
      coordinates = { x: -34, y: 2.5, z: 0.05 }
    } else {
      coordinates = { x: 34, y: 2.5, z: 0.05 }
    }

    return coordinates
  }

  getHoverTransform(item: MaterialItem, context: MaterialContext) {
    const isLeft = item.location.player === context.rules.players[0]
    const transform = [
      'translateZ(10em)',
      'scale(2)'
    ]

    if (isLeft) transform.push('translateX(25%)')
    if (!isLeft) transform.push('translateX(-25%)')

    if (item.location.x === 0) transform.push('translateY(-25%)')

    return transform
  }

  // Debug purpose
  /*getLocations(context: MaterialContext) {
    return context.rules.players.map((p) => ({
      type: LocationType.PlayerKeepCards,
      player: p
    }))
  }*/


  locationDescription = new PlayerKeepCardsDescription()
}

export class PlayerKeepCardsDescription extends DropAreaDescription {
  height = energyCardDescription.height * 3.8
  width = energyCardDescription.width + 1
  borderRadius = energyCardDescription.borderRadius
}

export const playerKeepCards = new PlayerKeepCardsLocator()