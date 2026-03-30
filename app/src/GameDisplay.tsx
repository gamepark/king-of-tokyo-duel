import { css } from '@emotion/react'
import { DevToolEntry, DevToolsHub, GameTable, GameTableNavigation } from '@gamepark/react-game'
import { FC, lazy, Suspense, useState } from 'react'
import { SmashAnimation } from './animations/SmashAnimation'
import { PlayerPanels } from './panels/PlayerPanels'

const CardDebugViewer = import.meta.env.DEV ? lazy(() => import('./debug/CardDebugViewer').then(m => ({ default: m.CardDebugViewer }))) : null

const KingOfTokyoDuelDevTools: FC = () => {
  const [showCards, setShowCards] = useState(false)
  return (
    <>
      <DevToolsHub>
        <DevToolEntry icon={'\u2726'} label="Card Viewer" desc="Browse all power cards" onClick={() => setShowCards(!showCards)}/>
      </DevToolsHub>
      {showCards && CardDebugViewer && <Suspense><CardDebugViewer onClose={() => setShowCards(false)}/></Suspense>}
    </>
  )
}

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
      {import.meta.env.DEV && <KingOfTokyoDuelDevTools/>}
    </GameTable>
  </>
}

const centerNavigationCss = css`
  display: none;
  left: 50%;
  transform: translateX(-50%);
`
