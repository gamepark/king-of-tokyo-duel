import { css } from '@emotion/react'
import { DiceColor } from '@gamepark/king-of-tokyo-duel/material/DiceColor'
import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { helpContainerCss, helpSectionCss, helpSeparatorCss, helpTextCss, helpTitleCss } from './helpCss'
import { HelpComponents, RedDiceComponents, WhiteDiceComponents } from './HelpComponents'

export const DiceHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  const Components = { ...HelpComponents, ...(item.id === DiceColor.Red ? RedDiceComponents : WhiteDiceComponents) }
  return (
    <div css={helpContainerCss}>
      <h2 css={helpTitleCss}>
        <Trans defaults={item.id === DiceColor.Red ? 'dice' : 'dice.extra'}/>
      </h2>
      <div css={helpTextCss}>
        <Trans defaults="dice.help"/>
      </div>

      <div css={helpSeparatorCss}/>

      <div css={faceSectionCss}>
        <div css={[helpSectionCss, smashBorderCss]}>
          <div css={helpTextCss}>
            <Trans defaults="dice.smash" components={Components}/>
          </div>
        </div>
        <div css={[helpSectionCss, healBorderCss]}>
          <div css={helpTextCss}>
            <Trans defaults="dice.hearth" components={Components}/>
          </div>
        </div>
        <div css={[helpSectionCss, energyBorderCss]}>
          <div css={helpTextCss}>
            <Trans defaults="dice.energy" components={Components}/>
          </div>
        </div>
        <div css={[helpSectionCss, fameBorderCss]}>
          <div css={helpTextCss}>
            <Trans defaults="dice.pull" components={Components}/>
          </div>
        </div>
        <div css={[helpSectionCss, powerBorderCss]}>
          <div css={helpTextCss}>
            <Trans defaults="dice.power" components={Components}/>
          </div>
        </div>
      </div>
    </div>
  )
}

const faceSectionCss = css`
  display: flex;
  flex-direction: column;
  gap: 0.3em;
`

const smashBorderCss = css`
  border-left-color: rgba(220, 70, 70, 0.35);
`

const healBorderCss = css`
  border-left-color: rgba(220, 70, 100, 0.35);
`

const energyBorderCss = css`
  border-left-color: rgba(80, 180, 60, 0.35);
`

const fameBorderCss = css`
  border-left-color: rgba(64, 168, 224, 0.35);
`

const powerBorderCss = css`
  border-left-color: rgba(180, 120, 220, 0.35);
`
