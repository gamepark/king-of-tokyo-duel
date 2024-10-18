/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { GameTable, GameTableNavigation } from '@gamepark/react-game'
import { FC } from 'react'
import { SmashAnimation } from './animations/SmashAnimation'
import { PlayerPanels } from './panels/PlayerPanels'

type GameDisplayProps = {
  players: number
}

export const GameDisplay: FC<GameDisplayProps> = () => {
  const xMin = -38.5
  const yMin = -20
  return <>
    <GameTable xMin={xMin} xMax={38.5} yMin={yMin} yMax={20}
               margin={{ top: 7, left: 0, right: 0, bottom: 0 }}
               css={process.env.NODE_ENV === 'development' && css`border: 1px solid white;`}>
      <GameTableNavigation css={centerNavigationCss}/>
      <PlayerPanels/>
      <SmashAnimation left={-xMin} top={-yMin} />
    </GameTable>
  </>
}

const centerNavigationCss = css`
  display: none;
  left: 50%;
  transform: translateX(-50%);
`
