/** @jsxImportSource @emotion/react */
import { KingOfTokyoDuelRules } from '@gamepark/king-of-tokyo-duel/KingOfTokyoDuelRules'
import { Pawn } from '@gamepark/king-of-tokyo-duel/material/Pawn'
import { PullPawn } from '@gamepark/king-of-tokyo-duel/rules/effects/EffectType'
import { EffectWithSource } from '@gamepark/king-of-tokyo-duel/rules/effects/EffectWithSource'
import { Memory } from '@gamepark/king-of-tokyo-duel/rules/Memory'
import { Picture, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Trans } from 'react-i18next'
import Destruction from '../images/icons/Destruction.png'
import Fame from '../images/icons/Fame.png'
import { headerIconCss } from './headerIconCss'

export const PullPawnHeader = () => {
  const rules = useRules<KingOfTokyoDuelRules>()!
  const effect = rules.remind<EffectWithSource<PullPawn>>(Memory.CurrentEffect)
  const target = effect.target
  const me = usePlayerId() === target
  const player = usePlayerName(target)
  const pawn = effect.effect.pawn
  return <Trans defaults={`header.pull.${me ? 'you' : 'player'}`} values={{ player }} components={{
    pawn: <Picture src={pawn === Pawn.Fame ? Fame : Destruction} css={headerIconCss}/>
  }}/>
}
