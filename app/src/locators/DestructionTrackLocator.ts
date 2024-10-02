import { HexagonalGridCoordinatesSystem } from '@gamepark/rules-api'
import { TrackLocator } from './TrackLocator'

export class DestructionTrackLocator extends TrackLocator {
  coordinatesSystem = HexagonalGridCoordinatesSystem.OddQ
  positionOnParent = { x: 50, y: 66 }
}

export const destructionTrackLocator = new DestructionTrackLocator()