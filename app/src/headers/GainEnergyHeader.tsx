/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { KingOfTokyoDuelRules } from '@gamepark/king-of-tokyo-duel/KingOfTokyoDuelRules'
import { GainEnergy } from '@gamepark/king-of-tokyo-duel/rules/effects/EffectType'
import { EffectWithSource } from '@gamepark/king-of-tokyo-duel/rules/effects/EffectWithSource'
import { Memory } from '@gamepark/king-of-tokyo-duel/rules/Memory'
import { Picture, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Trans } from 'react-i18next'
import Energy from '../images/icons/Energy.png'

export const GainEnergyHeader = () => {
  const rules = useRules<KingOfTokyoDuelRules>()!
  const effect = rules.remind<EffectWithSource<GainEnergy>[]>(Memory.Effects)[0]
  const count = effect.effect.count
  const target = effect.target
  const me = usePlayerId() === target
  const player = usePlayerName(target)
  return <Trans defaults={`header.gain-energy.${me ? 'you' : 'player'}`} values={{ player, count }} components={{
    energy: <Picture src={Energy} css={iconCss}/>
  }}/>
}

const iconCss = css`
  height: 0.9em;
  position: relative;
  top: 0.1em;
`