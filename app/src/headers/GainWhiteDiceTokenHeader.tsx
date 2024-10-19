/** @jsxImportSource @emotion/react */
import { KingOfTokyoDuelRules } from '@gamepark/king-of-tokyo-duel/KingOfTokyoDuelRules'
import { GainWhiteDiceToken } from '@gamepark/king-of-tokyo-duel/rules/effects/EffectType'
import { EffectWithSource } from '@gamepark/king-of-tokyo-duel/rules/effects/EffectWithSource'
import { Memory } from '@gamepark/king-of-tokyo-duel/rules/Memory'
import { Picture, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Trans } from 'react-i18next'
import DiceToken from '../images/tokens/DiceToken.jpg'
import { headerIconCss } from './headerIconCss'

export const GainWhiteDiceTokenHeader = () => {
  const rules = useRules<KingOfTokyoDuelRules>()!
  const effect = rules.remind<EffectWithSource<GainWhiteDiceToken>>(Memory.CurrentEffect)
  const target = effect.target
  const me = usePlayerId() === target
  const player = usePlayerName(target)
  return <Trans defaults={`header.gain-dice-token.${me ? 'you' : 'player'}`} values={{ player }} components={{
    token: <Picture src={DiceToken} css={headerIconCss}/>
  }}/>
}
