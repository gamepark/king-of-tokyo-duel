import { faRotate } from '@fortawesome/free-solid-svg-icons/faRotate'
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons/faRotateLeft'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons/faRotateRight'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Buzz, buzzDescriptions } from '@gamepark/king-of-tokyo-duel/material/Buzz'
import { ItemContext, ItemMenuButton, PolyhexDescription } from '@gamepark/react-game'
import { HexGridSystem, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import AlienShortcut from '../images/buzz_token/AlienShortcut.png'
import AnubisEnergyHeal from '../images/buzz_token/AnubisEnergyHeal.png'
import CatSmash from '../images/buzz_token/CatSmash.png'
import DragonEnergySmashHeal from '../images/buzz_token/DragonEnergySmashHeal.png'
import FishHeal from '../images/buzz_token/FishHeal.png'
import LizardSmashDice from '../images/buzz_token/LizardSmashDice.png'
import PandaDice from '../images/buzz_token/PandaDice.png'
import PenguinExtendSmash from '../images/buzz_token/PenguinExtendSmash.png'
import PhantomExtendHeal from '../images/buzz_token/PhantomExtendHeal.png'
import PumpkinHealSmash2Heal from '../images/buzz_token/PumpkinHealSmash2Heal.png'
import TheKingBuzz from '../images/buzz_token/TheKingBuzz.png'
import TigerEnergy from '../images/buzz_token/TigerEnergy.png'

export class BuzzTokenDescription extends PolyhexDescription {
  borderRadius = 0.5

  coordinatesSystem = HexGridSystem.OddQ

  getSize(id: Buzz) {
    return tokenSizes[id]
  }

  images = {
    [Buzz.TheKingBuzz]: TheKingBuzz,
    [Buzz.CatSmash]: CatSmash,
    [Buzz.PandaDice]: PandaDice,
    [Buzz.FishHeal]: FishHeal,
    [Buzz.TigerEnergy]: TigerEnergy,
    [Buzz.LizardSmashDice]: LizardSmashDice,
    [Buzz.AnubisEnergyHeal]: AnubisEnergyHeal,
    [Buzz.DragonEnergySmashHeal]: DragonEnergySmashHeal,
    [Buzz.AlienShortcut]: AlienShortcut,
    [Buzz.PumpkinHealSmash2Heal]: PumpkinHealSmash2Heal,
    [Buzz.PhantomExtendHeal]: PhantomExtendHeal,
    [Buzz.PenguinExtendSmash]: PenguinExtendSmash
  }

  getPolyhexShape(item: MaterialItem) {
    return buzzDescriptions[item.id as Buzz].effects.map((_, x) => ({ x, y: 0 }))
  }

  getItemMenu(item: MaterialItem, context: ItemContext, legalMoves: MaterialMove[]) {
    const { rules, type, index } = context
    if (!legalMoves.some(move => this.canDrag(move, context))) return
    switch (buzzDescriptions[item.id as Buzz].effects.length) {
      case 2:
        return <>
          {this.getHelpButton(item, context)}
          <ItemMenuButton label={<Trans defaults="Rotate"/>}
                          move={rules.material(type).index(index).rotateItem(item =>
                            (item.location.rotation + (item.location.rotation % 3 === 0 ? 2 : 1)) % 6
                          )}
                          options={{ local: true }}
                          angle={90}>
            <FontAwesomeIcon icon={faRotateRight}/>
          </ItemMenuButton>
          <ItemMenuButton label={<Trans defaults="Rotate"/>}
                          move={rules.material(type).index(index).rotateItem(item =>
                            (item.location.rotation + (item.location.rotation % 3 === 2 ? 4 : 5)) % 6
                          )}
                          options={{ local: true }}
                          angle={270}>
            <FontAwesomeIcon icon={faRotateLeft}/>
          </ItemMenuButton>
        </>
      case 3:
        return <>
          {this.getHelpButton(item, context)}
          <ItemMenuButton label={<Trans defaults="Rotate"/>}
                          move={rules.material(type).index(index).rotateItem(item => (item.location.rotation + 3) % 6)}
                          options={{ local: true }}
                          angle={90}>
            <FontAwesomeIcon icon={faRotate}/>
          </ItemMenuButton>
        </>
      default:
        return
    }
  }
}

export const buzzTokenDescription = new BuzzTokenDescription()

export const tokenSizes: Record<Buzz, { height: number, width: number }> = {
  [Buzz.CatSmash]: { height: 3.0, width: 2.3 },
  [Buzz.PandaDice]: { height: 3.0, width: 2.3 },
  [Buzz.TheKingBuzz]: { height: 3.0, width: 2.3 },
  [Buzz.FishHeal]: { height: 3.0, width: 2.3 },
  [Buzz.TigerEnergy]: { height: 3.0, width: 2.3 },
  [Buzz.LizardSmashDice]: { height: 2.71, width: 4.776 },
  [Buzz.AnubisEnergyHeal]: { height: 2.71, width: 4.776 },
  [Buzz.DragonEnergySmashHeal]: { height: 4, width: 6.171 },
  [Buzz.AlienShortcut]: { height: 4, width: 6.171 },
  [Buzz.PumpkinHealSmash2Heal]: { height: 4, width: 6.171 },
  [Buzz.PhantomExtendHeal]: { height: 3.805, width: 4.776 },
  [Buzz.PenguinExtendSmash]: { height: 3.805, width: 4.776 }
}
