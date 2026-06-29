import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { helpContainerCss, helpSectionCss, helpSeparatorCss, helpTextCss, helpTitleCss } from './helpCss'
import { HelpComponents } from './HelpComponents'

export const MonsterBoardHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  const { t } = useTranslation()
  return (
    <div css={helpContainerCss}>
      <h2 css={helpTitleCss}>
        <Trans i18nKey="monster.board" values={{ monster: t(`monster.${item.id}`) }}/>
      </h2>

      <div css={helpSeparatorCss}/>

      <div css={helpSectionCss}>
        <div css={helpTextCss}>
          <Trans i18nKey={`monster.power.${item.id}`} components={HelpComponents}/>
        </div>
      </div>
    </div>
  )
}
