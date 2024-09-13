/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { StyledPlayerPanel, usePlayers } from '@gamepark/react-game'
import { FC } from 'react'
import { createPortal } from 'react-dom'

export const PlayerPanels: FC<any> = () => {
  const players = usePlayers()
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