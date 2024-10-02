import { HexagonalGridCoordinatesSystem } from '@gamepark/rules-api'
import { TrackLocator } from './TrackLocator'

export class FameTrackLocator extends TrackLocator {
  coordinatesSystem = HexagonalGridCoordinatesSystem.EvenQ
  positionOnParent = { x: 50, y: 34 }
}

export const fameTrackLocator = new FameTrackLocator()