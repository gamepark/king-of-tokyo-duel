import { KingOfTokyoDuelRules } from '@gamepark/king-of-tokyo-duel/KingOfTokyoDuelRules'
import { CamouflageRule } from '@gamepark/king-of-tokyo-duel/rules/CamouflageRule'
import { Picture, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Trans } from 'react-i18next'
import Hit from '../images/icons/Hit.png'
import { headerIconCss } from './headerIconCss'

export const CamouflageHeader = () => {
  const rules = useRules<KingOfTokyoDuelRules>()!
  const activePlayer = rules.getActivePlayer()
  const me = usePlayerId()
  const player = usePlayerName(activePlayer)
  const count = new CamouflageRule(rules.game).damageContext.effect.count
  if (me !== activePlayer) {
    return <Trans i18nKey="header.camouflage.player" values={{ player, count }} components={{
      hit: <Picture src={Hit} css={headerIconCss}/>
    }}/>
  }
  return <Trans i18nKey="header.camouflage.you" values={{ count }} components={{
    hit: <Picture src={Hit} css={headerIconCss}/>
  }}/>
}
