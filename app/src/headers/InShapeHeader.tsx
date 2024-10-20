/** @jsxImportSource @emotion/react */
import { KingOfTokyoDuelRules } from '@gamepark/king-of-tokyo-duel/KingOfTokyoDuelRules'
import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { CustomMoveType } from '@gamepark/king-of-tokyo-duel/rules/CustomMoveType'
import { InShape } from '@gamepark/king-of-tokyo-duel/rules/effects/EffectType'
import { EffectWithSource } from '@gamepark/king-of-tokyo-duel/rules/effects/EffectWithSource'
import { Memory } from '@gamepark/king-of-tokyo-duel/rules/Memory'
import { Picture, PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType, isDeleteItemType, MaterialMove } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import Energy from '../images/icons/Energy.png'
import Fame from '../images/icons/Fame.png'
import { headerIconCss } from './headerIconCss'

export const InShapeHeader = () => {
  const rules = useRules<KingOfTokyoDuelRules>()!
  const activePlayer = rules.getActivePlayer()
  const me = usePlayerId()
  const player = usePlayerName(activePlayer)
  const pay = useLegalMove(isDeleteItemType(MaterialType.Energy))
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))
  const count = rules.remind<EffectWithSource<InShape>>(Memory.CurrentEffect).effect.count
  if (me !== activePlayer) {
    return <Trans defaults="header.in-shape.player" values={{ player, count }} components={{
      energy: <Picture src={Energy} css={headerIconCss}/>,
      fame: <Picture src={Fame} css={headerIconCss}/>
    }}/>
  } else {
    return <Trans defaults="header.in-shape.you" values={{ player, count }} components={{
      pay: <PayEnergyButton move={pay}/>,
      fame: <Picture src={Fame} css={headerIconCss}/>,
      pass: <PlayMoveButton move={pass}/>
    }}/>
  }
}

const PayEnergyButton = ({ move }: { move?: MaterialMove }) => {
  return <PlayMoveButton move={move}>
    <Trans defaults="pay.button" values={{ amount: 1 }} components={{
      icon: <Picture css={headerIconCss} src={Energy}/>
    }}/>
  </PlayMoveButton>
}
