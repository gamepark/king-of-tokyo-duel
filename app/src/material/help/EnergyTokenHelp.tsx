/** @jsxImportSource @emotion/react */
import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { HelpComponents } from './HelpComponents'

export const EnergyTokenHelp: FC<MaterialHelpProps> = () => {
  return (
    <>
      <h2>
        <Trans
          defaults="energy"
        />
      </h2>
      <p>
        <Trans
          defaults="energy.help"
          components={HelpComponents}
        />
      </p>
    </>
  )
}