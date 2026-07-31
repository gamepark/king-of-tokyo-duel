import { Buzz, buzzDescriptions } from '@gamepark/king-of-tokyo-duel/material/Buzz'
import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { Pawn } from '@gamepark/king-of-tokyo-duel/material/Pawn'
import { HexagonalGridLocator, ItemContext, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem, Polyhex } from '@gamepark/rules-api'

// Tilt applied to the 2-spaces Buzz tokens so they follow the diagonal between 2 consecutive track spaces
const buzzTokenTilt = 40

// Distance between the extra space drawn on a Buzz token and the middle of the 2 track spaces it covers
const extraSpaceDistance = 0.7

export abstract class TrackLocator extends HexagonalGridLocator {
  parentItemType = MaterialType.MainBoard
  size = { x: 1.28, y: 1.75 }

  getDropArea() {
    return new Polyhex([Array(15).fill(true)], { xMin: -7, system: this.coordinatesSystem })
  }

  getPositionDependencies(location: Location, context: MaterialContext) {
    // Location coordinates of half-step spaces depend on the Buzz tokens placed on this track (their x and rotation).
    return context.rules.material(MaterialType.Buzz).location(location.type).getItems<Buzz>()
  }

  getLocationCoordinates(location: Location, context: MaterialContext) {
    if (location.x! - Math.floor(location.x!) === 0.5) {
      // Half-step space: an extra space drawn on a Buzz token, between the 2 track spaces it covers.
      const buzz = context.rules.material(MaterialType.Buzz).location(location.type).getItems<Buzz>()
        .find(item => Math.abs(item.location.x! - location.x!) === 0.5)!
      // The center of the 2 track spaces cannot be interpolated (the columns are staggered): take the middle of both spaces.
      const before = super.getLocationCoordinates({ ...location, x: Math.floor(location.x!) }, context)
      const after = super.getLocationCoordinates({ ...location, x: Math.ceil(location.x!) }, context)
      // From there, the extra space is drawn perpendicularly to the token direction
      const angle = (this.getRotateZ(buzz.location, context) + buzzTokenTilt - 90) * Math.PI / 180
      return {
        x: (before.x! + after.x!) / 2 + extraSpaceDistance * Math.cos(angle),
        y: (before.y! + after.y!) / 2 + extraSpaceDistance * Math.sin(angle),
        z: before.z
      }
    }
    return super.getLocationCoordinates(location, context)
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
        transform.push(`rotateZ(${buzzTokenTilt}deg)`)
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
