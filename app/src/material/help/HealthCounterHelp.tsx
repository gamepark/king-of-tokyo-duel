/** @jsxImportSource @emotion/react */
import { Monster } from '@gamepark/king-of-tokyo-duel/material/Monster'
import { monsterBoardDescriptions } from '@gamepark/king-of-tokyo-duel/material/MonsterBoardDescription'
import { MaterialHelpProps, Picture, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { headerIconCss } from '../../headers/headerIconCss'
import Heart from '../../images/icons/Heart.png'

export const HealthCounterHelp: FC<MaterialHelpProps> = ({ item }) => {
  const { t } = useTranslation()
  const me = usePlayerId()
  const player = usePlayerName(item.location!.player)
  const isMine = me !== undefined && item.location!.player === me
  const life = item.location!.rotation ?? 0
  const max = monsterBoardDescriptions[item.location!.player as Monster].health
  return (
    <>
      <h2 style={{ textAlign: 'left', marginLeft: 0 }}>{t('life-tracker')}</h2>
      <p>
        <Trans defaults={isMine ? 'life-tracker.you' : 'life-tracker.player'} values={{ life, max, player }} components={{
          heart: <Picture src={Heart} css={headerIconCss}/>
        }}/>
      </p>
    </>
  )
}

