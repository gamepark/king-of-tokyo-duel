import { KingOfTokyoDuelOptionsSpec } from '@gamepark/king-of-tokyo-duel/KingOfTokyoDuelOptions'
import { KingOfTokyoDuelRules } from '@gamepark/king-of-tokyo-duel/KingOfTokyoDuelRules'
import { KingOfTokyoDuelSetup } from '@gamepark/king-of-tokyo-duel/KingOfTokyoDuelSetup'
import { GameProvider } from '@gamepark/react-game'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { gameAnimations } from './animations/GameAnimations'
import { App } from './App'
import { Locators } from './locators/Locators'
import { Material, MaterialI18n } from './material/Material'
import { theme } from './theme'
import { Tutorial } from './tutorial/Tutorial'
import { bot } from './tutorial/TutorialBot'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider
      game="king-of-tokyo-duel"
      Rules={KingOfTokyoDuelRules}
      optionsSpec={KingOfTokyoDuelOptionsSpec}
      GameSetup={KingOfTokyoDuelSetup}
      material={Material}
      materialI18n={MaterialI18n}
      locators={Locators}
      animations={gameAnimations}
      tutorial={new Tutorial()}
      ai={bot}
      theme={theme}
    >
      <App/>
    </GameProvider>
  </StrictMode>
)
