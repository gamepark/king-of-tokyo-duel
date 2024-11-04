/** @jsxImportSource @emotion/react */
import { DiceColor } from '@gamepark/king-of-tokyo-duel/material/DiceColor'
import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { HelpComponents, RedDiceComponents, WhiteDiceComponents } from './HelpComponents'

export const DiceHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  const Components = { ...HelpComponents, ...(item.id === DiceColor.Red ? RedDiceComponents : WhiteDiceComponents) }
  return (
    <>
      <h2>
        <Trans
          defaults={item.id === DiceColor.Red ? 'dice' : 'dice.extra'}
        />
      </h2>
      <p>
        <Trans
          defaults={`dice.help`}
        />
      </p>
      <p>
        <Trans
          defaults={`dice.smash`}
          components={Components}
        />
      </p>
      <p>
        <Trans
          defaults={`dice.hearth`}
          components={Components}
        />
      </p>
      <p>
        <Trans
          defaults={`dice.energy`}
          components={Components}
        />
      </p>
      <p>
        <Trans
          defaults={`dice.pull`}
          components={Components}
        />
      </p>
      <p>
        <Trans
          defaults={`dice.power`}
          components={Components}
        />
      </p>
    </>
  )
}