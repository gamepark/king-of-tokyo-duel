/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { PlayerColor } from '@gamepark/king-of-tokyo-duel/PlayerColor'
import { StyledPlayerPanel, usePlayers } from '@gamepark/react-game'
import { FC } from 'react'
import { createPortal } from 'react-dom'

export const PlayerPanels: FC<any> = () => {
  const players = usePlayers({ sortFromMe: true })
  const root = document.getElementById('root')
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((player, index) =>
        <StyledPlayerPanel
          key={player.id}
          player={player}
          color={playerColorCode[player.id]}
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

export const playerColorCode: Record<PlayerColor, string> = {
  [PlayerColor.Red]: 'red',
  [PlayerColor.Blue]: 'blue',
  [PlayerColor.Green]: 'green',
  [PlayerColor.Yellow]: 'yellow'
}