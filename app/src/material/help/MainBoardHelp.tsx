/** @jsxImportSource @emotion/react */
import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { HelpComponents } from './HelpComponents'

export const MainBoardHelp: FC<MaterialHelpProps> = () => {
  return (
    <>
      <h2>
        <Trans
          defaults="board"
        />
      </h2>
      <p>
        <Trans
          defaults="board.help"
          components={HelpComponents}
        />
      </p>
    </>
  )
}