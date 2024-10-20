/** @jsxImportSource @emotion/react */
import { KingOfTokyoDuelRules } from '@gamepark/king-of-tokyo-duel/KingOfTokyoDuelRules'
import { CustomMoveType } from '@gamepark/king-of-tokyo-duel/rules/CustomMoveType'
import { UnstableDnaRule } from '@gamepark/king-of-tokyo-duel/rules/UnstableDnaRule'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'

export const UnstableDnaHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<KingOfTokyoDuelRules>()!
  const activePlayer = rules.getActivePlayer()
  const me = usePlayerId()
  const player = usePlayerName(activePlayer)
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))
  const rival = usePlayerName(new UnstableDnaRule(rules.game).rival)
  if (me === activePlayer) {
    return <Trans defaults="header.unstable-dna.you" values={{ rival }} components={{
      pass: <PlayMoveButton move={pass}/>
    }}/>
  } else if (me !== undefined) {
    return <>{t('header.unstable-dna.player', { player })}</>
  } else {
    return <>{t('header.unstable-dna.spectator', { player, rival })}</>
  }
}
