import { css } from '@emotion/react'
import { ItemContext, RoundTokenDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import CounterA from '../images/player_counter/CounterA.png'
import CounterB from '../images/player_counter/CounterB.png'
import HealCounter from '../images/player_counter/CounterValue.png'

export class HealthCounterDescription extends RoundTokenDescription {
  diameter = 12.5

  image = HealCounter

  getItemExtraCss(item: MaterialItem, _context: ItemContext) {
    const player = item.location.player
    return css`
      &:after {
        content: '';
        background: url("${player === 1? CounterA: CounterB}");
        background-size: contain;
        background-repeat: no-repeat;
        transform: rotateZ(${-getHearthRotation(item.location.rotation)}deg);
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

export const getHearthRotation = (rotation: number) => {
  return [
    0, // 0
    17,
    32.5,
    48.5,
    64.5,
    80.5, // 5
    97,
    113,
    128.5,
    144.5,
    161.5, // 10
    178.5,
    195.5,
    213,
    229.5,
    247, // 15
    264,
    281,
    298,
    315,
    335.5][rotation]
}

export const healthCounterDescription = new HealthCounterDescription()