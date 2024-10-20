/** @jsxImportSource @emotion/react */
import { KingOfTokyoDuelRules } from '@gamepark/king-of-tokyo-duel/KingOfTokyoDuelRules'
import { TeslaImpulseRule } from '@gamepark/king-of-tokyo-duel/rules/TeslaImpulseRule'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const TeslaImpulseHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<KingOfTokyoDuelRules>()!
  const activePlayer = rules.getActivePlayer()
  const me = usePlayerId()
  const player = usePlayerName(activePlayer)
  const rival = usePlayerName(new TeslaImpulseRule(rules.game).rival)
  if (me === activePlayer) {
    return <>{t('header.tesla-impulse.you', { rival })}</>
  } else if (me !== undefined) {
    return <>{t('header.tesla-impulse.player', { player })}</>
  } else {
    return <>{t('header.tesla-impulse.spectator', { player, rival })}</>
  }
}
