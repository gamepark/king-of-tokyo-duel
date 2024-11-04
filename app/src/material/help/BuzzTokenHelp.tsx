/** @jsxImportSource @emotion/react */
import { Buzz, buzzDescriptions } from '@gamepark/king-of-tokyo-duel/material/Buzz'
import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { HelpComponents } from './HelpComponents'

export const BuzzTokenHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  const buzz = buzzDescriptions[item.id as Buzz]
  return (
    <>
      <h2>
        <Trans
          defaults="buzz.token"
        />
      </h2>
      <p>
        <Trans
          defaults="buzz.token.help"
          components={HelpComponents}
        />
      </p>
      {(buzz.changeTrack ?? 0) < 0 && (
        <p>
          <Trans
            defaults="buzz.token.track.less"
          />
        </p>
      )}
      {(buzz.changeTrack ?? 0) > 0 && (
        <p>
          <Trans
            defaults="buzz.token.track.more"
          />
        </p>
      )}
      {item.id === Buzz.TheKingBuzz && (
        <p>
          <Trans
            defaults="buzz.king"
          />
        </p>
      )}
    </>
  )
}