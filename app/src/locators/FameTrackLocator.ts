import { css } from '@emotion/react'
import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { HexagonalGridCoordinatesSystem, HexagonalGridLocator, ItemContext, LocationDescription } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'

export class FameTrackLocator extends HexagonalGridLocator {
  parentItemType = MaterialType.MainBoard
  positionOnParent = { x: 50, y: 34 }
  locationDescription = new LocationDescription({ width: 1.4, height: 1.4, borderRadius: 1, extraCss: css`background: rgba(255, 255, 255, 0.5);` })
  coordinatesSystem = HexagonalGridCoordinatesSystem.EvenQ
  size = { x: 1.27, y: 1.8 }

  getItemCoordinates(item: MaterialItem<number, number>, context: ItemContext<number, number, number>): Partial<Coordinates> {
    if (context.type === MaterialType.Pawn) {
      const { x = 0, y = 0 } = super.getItemCoordinates(item, context)
      return { x: x -0.1, y: y - 0.8 }
    }
    return super.getItemCoordinates(item, context)
  }
}

export const fameTrackLocator = new FameTrackLocator()