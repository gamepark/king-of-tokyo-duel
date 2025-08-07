import { Buzz, buzzDescriptions } from '@gamepark/king-of-tokyo-duel/material/Buzz'
import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { Pawn } from '@gamepark/king-of-tokyo-duel/material/Pawn'
import { HexagonalGridLocator, ItemContext, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem, Polyhex } from '@gamepark/rules-api'

export abstract class TrackLocator extends HexagonalGridLocator {
  parentItemType = MaterialType.MainBoard
  size = { x: 1.28, y: 1.75 }

  getDropArea() {
    return new Polyhex([Array(15).fill(true)], { xMin: -7, system: this.coordinatesSystem })
  }

  getLocationCoordinates(location: Location, context: MaterialContext) {
    const { x = 0, y = 0, z } = super.getLocationCoordinates(location, context)
    if (location.x! - Math.floor(location.x!) === 0.5) {
      const buzz = context.rules.material(MaterialType.Buzz).location(location.type).getItems<Buzz>()
        .find(item => Math.abs(item.location.x! - location.x!) === 0.5)!
      switch (buzz.location.rotation) {
        case 0:
          return { x: x + 0.5, y: y + 1, z }
        case 2:
          return { x: x + 0.5, y: y + 0.5, z }
        case 3:
          return { x: x - 0.5, y: y + 0.5, z }
        case 5:
          return { x: x - 0.5, y: y - 2.25, z }
      }
    }
    return { x, y, z }
  }

  getItemCoordinates(item: MaterialItem, context: ItemContext): Partial<Coordinates> {
    const { x = 0, y = 0 } = super.getItemCoordinates(item, context)
    if (context.type === MaterialType.Pawn) {
      if (item.id === Pawn.Fame) {
        return { x: x - 0.1, y: y - 0.8, z: 0.1 }
      } else {
        return { x: x + 0.3, y: y - 0.8, z: 0.1 }
      }
    }
    return { x, y }
  }

  placeItem(item: MaterialItem, context: ItemContext): string[] {
    const transform = super.placeItem(item, context)
    if (context.type === MaterialType.Buzz) {
      const description = buzzDescriptions[item.id as Buzz]
      if (description.effects.length === 2 && !description.changeTrack) {
        transform.push('translateY(-0.15em)')
      } else if (description.effects.length === 1) {
        transform.push('translateY(-0.3em)')
      }
      if (buzzDescriptions[item.id as Buzz].effects.length === 2) {
        transform.push('rotateZ(40deg)')
      }
    }
    return transform
  }

  getRotateZ(location: Location, context: MaterialContext) {
    switch (location.rotation) {
      case 2:
        return 100
      case 5:
        return 280
    }
    return super.getRotateZ(location, context)
  }
}
