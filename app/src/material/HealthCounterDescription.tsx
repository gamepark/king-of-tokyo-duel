import { HealthCounter } from '@gamepark/king-of-tokyo-duel/material/HealthCounter'
import { WheelDescription } from '@gamepark/react-game'
import CounterA from '../images/player_counter/CounterA.png'
import CounterB from '../images/player_counter/CounterB.png'
import HealthWheel from '../images/player_counter/CounterValue.png'

export class HealthCounterDescription extends WheelDescription {
  width = 12.5
  height = 12.5

  wheelImage = HealthWheel
  images = {
    [HealthCounter.Red]: CounterA,
    [HealthCounter.Blue]: CounterB
  }

  getImages() {
    const images = super.getImages()
    images.push(CounterA)
    images.push(CounterB)
    return images
  }

  angles = [
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
    335.5]
}

export const healthCounterDescription = new HealthCounterDescription()