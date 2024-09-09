/** @jsxImportSource @emotion/react */
import { KingOfTokyoDuelOptionsSpec } from '@gamepark/king-of-tokyo-duel/KingOfTokyoDuelOptions'
import { KingOfTokyoDuelRules } from '@gamepark/king-of-tokyo-duel/KingOfTokyoDuelRules'
import { KingOfTokyoDuelSetup } from '@gamepark/king-of-tokyo-duel/KingOfTokyoDuelSetup'
import { GameProvider, MaterialGameAnimations, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import translations from './translations.json'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider game="king-of-tokyo-duel" Rules={KingOfTokyoDuelRules} optionsSpec={KingOfTokyoDuelOptionsSpec} GameSetup={KingOfTokyoDuelSetup}
                  material={Material} locators={Locators} animations={new MaterialGameAnimations()}>
      <App/>
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
