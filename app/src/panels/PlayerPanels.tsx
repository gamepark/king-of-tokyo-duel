/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { usePlayers } from '@gamepark/react-game'
import { FC } from 'react'
import { createPortal } from 'react-dom'
import { PlayerPanel } from './PlayerPanel'

export const PlayerPanels: FC<any> = () => {
  const players = usePlayers()
  const root = document.getElementById('root')
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((player, index) =>
        <PlayerPanel
          key={player.id}
          player={player}
          index={index}
          css={[panelPosition, index === 0 ? topLeft : topRight]}
        />
      )}
    </>,
    root
  )
}


const topLeft = css`
  left: 2em;
  top: 10em;
`

const topRight = css`
  right: 2em;
  top: 10em;
`
const panelPosition = css`
  position: absolute;
  width: 28em;
`