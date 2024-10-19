/** @jsxImportSource @emotion/react */
import { KingOfTokyoDuelRules } from '@gamepark/king-of-tokyo-duel/KingOfTokyoDuelRules'
import { CustomMoveType } from '@gamepark/king-of-tokyo-duel/rules/CustomMoveType'
import { DominateRule } from '@gamepark/king-of-tokyo-duel/rules/DominateRule'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const DominateHeader = () => {
  const rules = useRules<KingOfTokyoDuelRules>()!
  const activePlayer = rules.getActivePlayer()
  const me = usePlayerId()
  const player = usePlayerName(activePlayer)
  const dominated = useLegalMove(isCustomMoveType(CustomMoveType.Pass))
  if (me !== activePlayer) {
    return <Trans defaults="header.dominate.player" values={{ player }}/>
  } else {
    const count = new DominateRule(rules.game).keepCards.length
    return <Trans defaults="header.dominate.you" values={{ player, count }} components={{
      pass: <PlayMoveButton move={dominated}/>
    }}/>
  }
}
