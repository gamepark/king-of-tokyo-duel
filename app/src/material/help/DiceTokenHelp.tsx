/** @jsxImportSource @emotion/react */
import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { HelpComponents } from './HelpComponents'

export const DiceTokenHelp: FC<MaterialHelpProps> = () => {
  return (
    <>
      <h2>
        <Trans
          defaults="dice.token"
        />
      </h2>
      <p>
        <Trans
          defaults="dice.token.help"
          components={HelpComponents}
        />
      </p>
    </>
  )
}