import { FillGapStrategy, hideItemId, MaterialGame, MaterialMove, PositiveSequenceStrategy, SecretMaterialRules, TimeLimit } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { MonsterBoard } from './material/MonsterBoard'
import { PlayerTurn } from './rules/PlayerTurn'
import { RuleId } from './rules/RuleId'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class KingOfTokyoDuelRules extends SecretMaterialRules<MonsterBoard, MaterialType, LocationType>
  implements TimeLimit<MaterialGame<MonsterBoard, MaterialType, LocationType>, MaterialMove<MonsterBoard, MaterialType, LocationType>, MonsterBoard> {
  rules = {
    [RuleId.PlayerTurn]: PlayerTurn
  }

  hidingStrategies = {
    [MaterialType.EnergyCard]: {
      [LocationType.EnergyCardDeck]: hideItemId
    }
  }

  locationsStrategies = {
    [MaterialType.EnergyCard]: {
      [LocationType.EnergyCardOnBoard]: new PositiveSequenceStrategy(),
      [LocationType.EnergyCardDeck]: new PositiveSequenceStrategy(),
    },
    [MaterialType.Buzz]: {
      [LocationType.BuzzStock]: new FillGapStrategy(),
      [LocationType.PlayerBuzzToken]: new FillGapStrategy()
    },
    [MaterialType.Dice]: {
      [LocationType.PlayerDice]: new PositiveSequenceStrategy()
    }
  }

  giveTime(): number {
    return 60
  }
}