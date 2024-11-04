/** @jsxImportSource @emotion/react */
import { Pawn } from '@gamepark/king-of-tokyo-duel/material/Pawn'
import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { HelpComponents } from './HelpComponents'

export const PawnHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  return (
    <>
      <h2>
        <Trans
          defaults={item.id === Pawn.Fame? "pawn.fame": "pawn.destruction"}
        />
      </h2>
      <p>
        <Trans
          defaults="pawn.help"
          components={HelpComponents}
        />
      </p>
    </>
  )
}