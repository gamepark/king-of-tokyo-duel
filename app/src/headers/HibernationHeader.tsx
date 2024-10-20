/** @jsxImportSource @emotion/react */
import { KingOfTokyoDuelRules } from '@gamepark/king-of-tokyo-duel/KingOfTokyoDuelRules'
import { LocationType } from '@gamepark/king-of-tokyo-duel/material/LocationType'
import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { CustomMoveType } from '@gamepark/king-of-tokyo-duel/rules/CustomMoveType'
import { Picture, PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType, isMoveItemType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import Heart from '../images/icons/Heart.png'
import { headerIconCss } from './headerIconCss'

export const HibernationHeader = () => {
  const rules = useRules<KingOfTokyoDuelRules>()!
  const activePlayer = rules.getActivePlayer()
  const me = usePlayerId()
  const player = usePlayerName(activePlayer)
  const pass = useLegalMove((move) => isCustomMoveType(CustomMoveType.Pass)(move))
  const discard = useLegalMove((move) => isMoveItemType(MaterialType.PowerCard)(move) && move.location.type === LocationType.Discard)
  if (me !== activePlayer) {
    return <Trans defaults="header.hibernation.player" values={{ player }} components={{
      heart: <Picture src={Heart} css={headerIconCss}/>
    }}/>
  } else {
    return <Trans defaults="header.hibernation.you" values={{ player }} components={{
      discard: <PlayMoveButton move={discard}/>,
      pass: <PlayMoveButton move={pass}/>,
      heart: <Picture src={Heart} css={headerIconCss}/>
    }}/>
  }
}
