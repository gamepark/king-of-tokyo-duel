import { HexGridSystem } from '@gamepark/rules-api'
import { TrackLocator } from './TrackLocator'

export class FameTrackLocator extends TrackLocator {
  coordinatesSystem = HexGridSystem.EvenQ
  positionOnParent = { x: 50, y: 34 }
}

export const fameTrackLocator = new FameTrackLocator()