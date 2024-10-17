/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { KingOfTokyoDuelRules } from '@gamepark/king-of-tokyo-duel/KingOfTokyoDuelRules'
import { Picture, PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isStartRule } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { diceTokenDescription } from '../material/DiceTokenDescription'

export const TitanicBatteriesHeader = () => {
  const rules = useRules<KingOfTokyoDuelRules>()!
  const activePlayer = rules.getActivePlayer()
  const me = usePlayerId()
  const player = usePlayerName(activePlayer)
  const pass = useLegalMove(isStartRule)
  if (me !== activePlayer) {
    return <Trans defaults="header.titanic-batteries.player" values={{ player }} components={{
      token: <Picture src={diceTokenDescription.image} css={iconCss}/>
    }}/>
  }
  return <Trans defaults="header.titanic-batteries.you" components={{
    pass: <PlayMoveButton move={pass}/>
  }}/>
}

const iconCss = css`
  height: 0.9em;
  position: relative;
  top: 0.1em;
`
