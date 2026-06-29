import { Pawn } from '@gamepark/king-of-tokyo-duel/material/Pawn'
import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { helpContainerCss, helpSeparatorCss, helpTextCss, helpTitleCss } from './helpCss'
import { HelpComponents } from './HelpComponents'

export const PawnHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  return (
    <div css={helpContainerCss}>
      <h2 css={helpTitleCss}>
        <Trans i18nKey={item.id === Pawn.Fame ? 'pawn.fame' : 'pawn.destruction'}/>
      </h2>
      <div css={helpSeparatorCss}/>
      <div css={helpTextCss}>
        <Trans i18nKey="pawn.help" components={HelpComponents}/>
      </div>
    </div>
  )
}
