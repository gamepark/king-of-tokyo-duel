import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { helpContainerCss, helpSeparatorCss, helpTextCss, helpTitleCss } from './helpCss'
import { HelpComponents } from './HelpComponents'

export const MainBoardHelp: FC<MaterialHelpProps> = () => {
  return (
    <div css={helpContainerCss}>
      <h2 css={helpTitleCss}>
        <Trans defaults="board"/>
      </h2>
      <div css={helpSeparatorCss}/>
      <div css={helpTextCss}>
        <Trans defaults="board.help" components={HelpComponents}/>
      </div>
    </div>
  )
}
