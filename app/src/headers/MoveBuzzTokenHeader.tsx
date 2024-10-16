/** @jsxImportSource @emotion/react */
import { KingOfTokyoDuelRules } from '@gamepark/king-of-tokyo-duel/KingOfTokyoDuelRules'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const MoveBuzzTokenHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<KingOfTokyoDuelRules>()!
  const activePlayer = rules.getActivePlayer()
  const me = usePlayerId()
  const player = usePlayerName(activePlayer)
  if (me !== activePlayer) {
    return <>{t('header.buzz.player', { player })}</>
  } else {
    return <>{t('header.buzz.you')}</>
  }
}
