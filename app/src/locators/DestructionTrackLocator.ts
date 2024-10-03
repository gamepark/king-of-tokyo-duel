import { HexGridSystem } from '@gamepark/rules-api'
import { TrackLocator } from './TrackLocator'

export class DestructionTrackLocator extends TrackLocator {
  coordinatesSystem = HexGridSystem.OddQ
  positionOnParent = { x: 50, y: 66 }
}

export const destructionTrackLocator = new DestructionTrackLocator()