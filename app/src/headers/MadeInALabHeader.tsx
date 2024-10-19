/** @jsxImportSource @emotion/react */
import { KingOfTokyoDuelRules } from '@gamepark/king-of-tokyo-duel/KingOfTokyoDuelRules'
import { CustomMoveType } from '@gamepark/king-of-tokyo-duel/rules/CustomMoveType'
import { Picture, PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import Energy from '../images/icons/Energy.png'
import { headerIconCss } from './headerIconCss'

export const MadeInALabHeader = () => {
  const rules = useRules<KingOfTokyoDuelRules>()!
  const activePlayer = rules.getActivePlayer()
  const me = usePlayerId()
  const player = usePlayerName(activePlayer)
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))
  if (me !== activePlayer) {
    return <Trans defaults="header.made-in-a-lab.player" values={{ player }} components={{
      energy: <Picture src={Energy} css={headerIconCss}/>
    }}/>
  }
  return <Trans defaults="header.made-in-a-lab.you" components={{
    pass: <PlayMoveButton move={pass}/>,
    energy: <Picture src={Energy} css={headerIconCss}/>
  }}/>
}
