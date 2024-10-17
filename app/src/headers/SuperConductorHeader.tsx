/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { KingOfTokyoDuelRules } from '@gamepark/king-of-tokyo-duel/KingOfTokyoDuelRules'
import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { CustomMoveType } from '@gamepark/king-of-tokyo-duel/rules/CustomMoveType'
import { SuperConductorRule } from '@gamepark/king-of-tokyo-duel/rules/SuperConductorRule'
import { Picture, PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { CreateItem, isCustomMoveType, isMoveItemType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import Energy from '../images/icons/Energy.png'

export const SuperConductorHeader = () => {
  const rules = useRules<KingOfTokyoDuelRules>()!
  const activePlayer = rules.getActivePlayer()
  const me = usePlayerId()
  const player = usePlayerName(activePlayer)
  const ignore = useLegalMove((move) => isCustomMoveType(CustomMoveType.Ignore)(move))
  const discard = useLegalMove<CreateItem>(isMoveItemType(MaterialType.PowerCard))
  const count = new SuperConductorRule(rules.game).energyDice
  if (me !== activePlayer) {
    return <Trans defaults="header.supercondutor.player" values={{ player, count }} components={{
      energy: <Picture src={Energy} css={iconCss}/>
    }}/>
  }
  return <Trans defaults="header.supercondutor.you" values={{ count }} components={{
    discard: <PlayMoveButton move={discard}>Gain {count} Energy</PlayMoveButton>,
    pass: <PlayMoveButton move={ignore}>Ignore</PlayMoveButton>,
    energy: <Picture src={Energy} css={iconCss}/>
  }}/>
}

const iconCss = css`
  height: 0.9em;
  position: relative;
  top: 0.1em;
`