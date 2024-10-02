import { Buzz, buzzDescriptions } from '@gamepark/king-of-tokyo-duel/material/Buzz'
import { PolyhexDescription } from '@gamepark/react-game'
import { HexagonalGridCoordinatesSystem, MaterialItem } from '@gamepark/rules-api'
import Buzz1 from '../images/buzz_token/buzz_1.png'
import Buzz10 from '../images/buzz_token/buzz_10.png'
import Buzz11 from '../images/buzz_token/buzz_11.png'
import Buzz12 from '../images/buzz_token/buzz_12.png'
import Buzz2 from '../images/buzz_token/buzz_2.png'
import Buzz3 from '../images/buzz_token/buzz_3.png'
import Buzz4 from '../images/buzz_token/buzz_4.png'
import Buzz5 from '../images/buzz_token/buzz_5.png'
import Buzz6 from '../images/buzz_token/buzz_6.png'
import Buzz7 from '../images/buzz_token/buzz_7.png'
import Buzz8 from '../images/buzz_token/buzz_8.png'
import Buzz9 from '../images/buzz_token/buzz_9.png'

export class BuzzTokenDescription extends PolyhexDescription {

  coordinatesSystem = HexagonalGridCoordinatesSystem.OddQ

  getSize(id: Buzz) {
    return tokenSizes[id]
  }

  images = {
    [Buzz.Buzz1]: Buzz1,
    [Buzz.Buzz2]: Buzz2,
    [Buzz.TheKingBuzz]: Buzz3,
    [Buzz.Buzz4]: Buzz4,
    [Buzz.Buzz5]: Buzz5,
    [Buzz.Buzz6]: Buzz6,
    [Buzz.Buzz7]: Buzz7,
    [Buzz.Buzz8]: Buzz8,
    [Buzz.Buzz9]: Buzz9,
    [Buzz.Buzz10]: Buzz10,
    [Buzz.Buzz11]: Buzz11,
    [Buzz.Buzz12]: Buzz12
  }

  getPolyhexShape(item: MaterialItem) {
    return buzzDescriptions[item.id as Buzz].effects.map((_, x) => ({ x, y: 0 }))
  }
}

export const buzzTokenDescription = new BuzzTokenDescription()

export const tokenSizes: Record<Buzz, { height: number, width: number }> = {
  [Buzz.Buzz1]: { height: 3.0, width: 2.3 },
  [Buzz.Buzz2]: { height: 3.0, width: 2.3 },
  [Buzz.TheKingBuzz]: { height: 3.0, width: 2.3 },
  [Buzz.Buzz4]: { height: 3.0, width: 2.3 },
  [Buzz.Buzz5]: { height: 3.0, width: 2.3 },
  [Buzz.Buzz6]: { height: 2.71, width: 4.776 },
  [Buzz.Buzz7]: { height: 2.71, width: 4.776 },
  [Buzz.Buzz8]: { height: 4, width: 6.171 },
  [Buzz.Buzz9]: { height: 4, width: 6.171 },
  [Buzz.Buzz10]: { height: 4, width: 6.171 },
  [Buzz.Buzz11]: { height: 3.805, width: 4.776 },
  [Buzz.Buzz12]: { height: 3.805, width: 4.776 }
}
