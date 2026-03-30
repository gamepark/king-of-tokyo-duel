import { Buzz, buzzDescriptions } from '@gamepark/king-of-tokyo-duel/material/Buzz'
import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { helpContainerCss, helpInfoCss, helpSectionCss, helpSeparatorCss, helpTextCss, helpTitleCss } from './helpCss'
import { HelpComponents } from './HelpComponents'

export const BuzzTokenHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  const buzz = buzzDescriptions[item.id as Buzz]
  return (
    <div css={helpContainerCss}>
      <h2 css={helpTitleCss}>
        <Trans defaults="buzz.token"/>
      </h2>
      <div css={helpTextCss}>
        <Trans defaults="buzz.token.help" components={HelpComponents}/>
      </div>

      <div css={helpSeparatorCss}/>

      {(buzz.changeTrack ?? 0) < 0 && (
        <div css={[helpSectionCss]}>
          <div css={helpInfoCss}>
            <Trans defaults="buzz.token.track.less"/>
          </div>
        </div>
      )}
      {(buzz.changeTrack ?? 0) > 0 && (
        <div css={[helpSectionCss]}>
          <div css={helpInfoCss}>
            <Trans defaults="buzz.token.track.more"/>
          </div>
        </div>
      )}
      {item.id === Buzz.TheKingBuzz && (
        <div css={[helpSectionCss]}>
          <div css={helpInfoCss}>
            <Trans defaults="buzz.king"/>
          </div>
        </div>
      )}
    </div>
  )
}
