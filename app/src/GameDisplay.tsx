/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { GameTable, GameTableNavigation } from '@gamepark/react-game'
import { FC } from 'react'
import { PlayerPanels } from './panels/PlayerPanels'

type GameDisplayProps = {
  players: number
}

export const GameDisplay: FC<GameDisplayProps> = () => {
  return <>
    <GameTable xMin={-40} xMax={40} yMin={-20} yMax={20}
               margin={{ top: 7, left: 0, right: 0, bottom: 0 }}
               css={process.env.NODE_ENV === 'development' && css`border: 1px solid white;`}>
      <GameTableNavigation css={centerNavigationCss}/>
      <PlayerPanels/>
    </GameTable>
  </>
}

const centerNavigationCss = css`
  display: none;
  left: 50%;
  transform: translateX(-50%);
`
