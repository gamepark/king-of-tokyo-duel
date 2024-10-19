/** @jsxImportSource @emotion/react */
import { KingOfTokyoDuelRules } from '@gamepark/king-of-tokyo-duel/KingOfTokyoDuelRules'
import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { CustomMoveType } from '@gamepark/king-of-tokyo-duel/rules/CustomMoveType'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType, isMoveItemType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const RebootingHeader = () => {
  const rules = useRules<KingOfTokyoDuelRules>()!
  const activePlayer = rules.getActivePlayer()
  const me = usePlayerId()
  const player = usePlayerName(activePlayer)
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))
  const reboot = useLegalMove(isMoveItemType(MaterialType.PowerCard))
  if (me !== activePlayer) {
    return <Trans defaults="header.rebooting.player" values={{ player }}/>
  }
  return <Trans defaults="header.rebooting.you" components={{
    resolve: <PlayMoveButton move={pass}/>,
    reboot: <PlayMoveButton move={reboot}/>
  }}/>
}
