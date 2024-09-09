import { MaterialGameSetup } from '@gamepark/rules-api'
import { KingOfTokyoDuelOptions } from './KingOfTokyoDuelOptions'
import { KingOfTokyoDuelRules } from './KingOfTokyoDuelRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class KingOfTokyoDuelSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, KingOfTokyoDuelOptions> {
  Rules = KingOfTokyoDuelRules

  setupMaterial(_options: KingOfTokyoDuelOptions) {
  }

  start() {
    this.startPlayerTurn(RuleId.PlayerTurn, this.game.players[0])
  }
}