/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { KingOfTokyoDuelRules } from '@gamepark/king-of-tokyo-duel/KingOfTokyoDuelRules'
import { CustomMoveType } from '@gamepark/king-of-tokyo-duel/rules/CustomMoveType'
import { Memory } from '@gamepark/king-of-tokyo-duel/rules/Memory'
import { Picture, PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import Energy from '../images/icons/Energy.png'

export const BuyHeader = () => {
  const rules = useRules<KingOfTokyoDuelRules>()!
  const activePlayer = rules.getActivePlayer()
  const me = usePlayerId()
  const player = usePlayerName(activePlayer)
  const stop = useLegalMove(isCustomMoveType(CustomMoveType.Pass))
  const renew = useLegalMove(isCustomMoveType(CustomMoveType.Pass)) // TODO: CustomMoveType.RenewCards
  const hasBoughtCards = rules?.remind(Memory.BoughtCards)?.length
  if (me !== activePlayer) {
    return <Trans defaults="header.buy.player" values={{ player }}/>
  }
  return <Trans defaults={`header.${hasBoughtCards ? 'buy-more' : 'buy'}.you`} components={{
    renew: <PlayMoveButton move={renew}
                           confirmation={{
                             text: <Trans defaults="header.renew.confirm" components={{ energy: <Picture src={Energy} css={iconCss}/> }}/>
                           }}/>,
    pass: <PlayMoveButton move={stop}/>,
    energy: <Picture src={Energy} css={iconCss}/>
  }}/>
}

const iconCss = css`
  height: 0.9em;
  position: relative;
  top: 0.1em;
`
