/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Pawn } from '@gamepark/king-of-tokyo-duel/material/Pawn'
import { BoardDescription, ComponentSize } from '@gamepark/react-game'
import Destruction from '../images/pawn/destruction.png'
import Fame from '../images/pawn/fame.png'

export class PawnDescription extends BoardDescription {
  getSize(id: any): ComponentSize {
    if (id === Pawn.Fame) {
      return {
        width: 2,
        height: 2 / (108/169)
      }
    }

    return {
      width: 2.5,
      height: 2.5 / (114/154)
    }
  }

  images = {
    [Pawn.Fame]: Fame,
    [Pawn.Destruction]: Destruction
  }

  getFrontExtraCss() {
    return css`
      filter: drop-shadow(0em 0em 0.1em white) drop-shadow(0em 0em 0.1em white)  drop-shadow(0em 0em 0.1em white);
    `
  }
}

export const pawnDescription = new PawnDescription()