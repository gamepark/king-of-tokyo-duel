import { KingOfTokyoDuelBot } from '@gamepark/king-of-tokyo-duel/KingOfTokyoDuelBot'
import { LocationType } from '@gamepark/king-of-tokyo-duel/material/LocationType'
import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { Monster } from '@gamepark/king-of-tokyo-duel/material/Monster'
import { GameAI } from '@gamepark/react-game'
import { MaterialGame, MaterialMove } from '@gamepark/rules-api'

export const bot: GameAI<MaterialGame<Monster, MaterialType, LocationType>, MaterialMove<Monster, MaterialType, LocationType>, Monster>
  = (game: MaterialGame<Monster, MaterialType, LocationType>, playerId: Monster): Promise<MaterialMove[]> => {
  return Promise.resolve(new KingOfTokyoDuelBot(playerId).run(game))
}