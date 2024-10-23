/** @jsxImportSource @emotion/react */
import { KingOfTokyoDuelRules } from '@gamepark/king-of-tokyo-duel/KingOfTokyoDuelRules'
import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { CustomMoveType } from '@gamepark/king-of-tokyo-duel/rules/CustomMoveType'
import { GainEnergy } from '@gamepark/king-of-tokyo-duel/rules/effects/EffectType'
import { EffectWithSource } from '@gamepark/king-of-tokyo-duel/rules/effects/EffectWithSource'
import { Memory } from '@gamepark/king-of-tokyo-duel/rules/Memory'
import { Picture, PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { CreateItem, isCustomMoveType, isMoveItemType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import Energy from '../images/icons/Energy.png'
import { headerIconCss } from './headerIconCss'

export const SuperConductorHeader = () => {
  const rules = useRules<KingOfTokyoDuelRules>()!
  const activePlayer = rules.getActivePlayer()
  const me = usePlayerId()
  const player = usePlayerName(activePlayer)
  const pass = useLegalMove((move) => isCustomMoveType(CustomMoveType.Pass)(move))
  const discard = useLegalMove<CreateItem>(isMoveItemType(MaterialType.PowerCard))
  const count = rules.remind<EffectWithSource<GainEnergy>>(Memory.CurrentEffect).effect.count
  if (me !== activePlayer) {
    return <Trans defaults="header.superconductor.player" values={{ player, count }} components={{
      energy: <Picture src={Energy} css={headerIconCss}/>
    }}/>
  }
  return <Trans defaults="header.superconductor.you" values={{ count }} components={{
    discard: <PlayMoveButton move={discard}/>,
    pass: <PlayMoveButton move={pass}/>,
    energy: <Picture src={Energy} css={headerIconCss}/>
  }}/>
}
