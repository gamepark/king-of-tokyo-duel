import { FillGapStrategy, MaterialGame, MaterialMove, PositiveSequenceStrategy, SecretMaterialRules, TimeLimit } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { Monster } from './material/Monster'
import { BuyRule } from './rules/BuyRule'
import { ChangePlayerRule } from './rules/ChangePlayerRule'
import { DominateRule } from './rules/DominateRule'
import { EffectRule } from './rules/EffectRule'
import { GainEnergyRule } from './rules/GainEnergyRule'
import { HealRule } from './rules/HealRule'
import { MoveBuzzTokenRule } from './rules/MoveBuzzTokenRule'
import { MovePawnsRule } from './rules/MovePawnsRule'
import { RollDiceRule } from './rules/RollDiceRule'
import { RuleId } from './rules/RuleId'
import { SmashRule } from './rules/SmashRule'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class KingOfTokyoDuelRules extends SecretMaterialRules<Monster, MaterialType, LocationType>
  implements TimeLimit<MaterialGame<Monster, MaterialType, LocationType>, MaterialMove<Monster, MaterialType, LocationType>, Monster> {
  rules = {
    [RuleId.RollDice]: RollDiceRule,
    [RuleId.MovePawns]: MovePawnsRule,
    [RuleId.GainEnergy]: GainEnergyRule,
    [RuleId.Smash]: SmashRule,
    [RuleId.Buy]: BuyRule,
    [RuleId.ChangePlayer]: ChangePlayerRule,
    [RuleId.Effect]: EffectRule,
    [RuleId.Heal]: HealRule,
    [RuleId.Dominate]: DominateRule,
    [RuleId.MoveBuzzToken]: MoveBuzzTokenRule
  }

  hidingStrategies = {
    [MaterialType.EnergyCard]: {
      //[LocationType.EnergyCardDeck]: hideItemId
    }
  }

  locationsStrategies = {
    [MaterialType.EnergyCard]: {
      [LocationType.EnergyCardOnBoard]: new PositiveSequenceStrategy(),
      [LocationType.EnergyCardDeck]: new PositiveSequenceStrategy(),
      [LocationType.Discard]: new PositiveSequenceStrategy(),
      [LocationType.PlayerKeepCards]: new PositiveSequenceStrategy()
    },
    [MaterialType.Buzz]: {
      [LocationType.BuzzStock]: new FillGapStrategy(),
      [LocationType.PlayerBuzzToken]: new FillGapStrategy()
    },
    [MaterialType.Dice]: {
      [LocationType.PlayerHand]: new PositiveSequenceStrategy(),
      [LocationType.PlayerRolledDice]: new FillGapStrategy(),
      [LocationType.WhiteDiceStock]: new PositiveSequenceStrategy()
    }
  }

  giveTime(): number {
    return 60
  }
}