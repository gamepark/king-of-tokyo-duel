import { css } from '@emotion/react'
import { ItemContext, RoundTokenDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import CounterA from '../images/player_counter/CounterA.png'
import CounterB from '../images/player_counter/CounterB.png'
import HealCounter from '../images/player_counter/CounterValue.png'

export class HealthCounterDescription extends RoundTokenDescription {
  diameter = 10

  image = HealCounter

  getItemExtraCss(item: MaterialItem, _context: ItemContext) {
    const player = item.location.player
    return css`
      &:after {
        content: '';
        background: url("${player === 1? CounterA: CounterB}");
        background-size: contain;
        background-repeat: no-repeat;
        transform: rotateZ(${(20 - item.location.rotation) * 17.6}deg);
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
    `
  }

  getImages() {
    const images = super.getImages()
    images.push(CounterA)
    images.push(CounterB)
    return images
  }
}

export const healthCounterDescription = new HealthCounterDescription()