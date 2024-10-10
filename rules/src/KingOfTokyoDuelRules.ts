import { FillGapStrategy, MaterialGame, MaterialMove, PositiveSequenceStrategy, SecretMaterialRules, TimeLimit } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { Monster } from './material/Monster'
import { AfterDiceResolutionRule } from './rules/AfterDiceResolutionRule'
import { BuyRule } from './rules/BuyRule'
import { CamouflageRule } from './rules/CamouflageRule'
import { ChangePlayerRule } from './rules/ChangePlayerRule'
import { DominateRule } from './rules/DominateRule'
import { EffectRule } from './rules/EffectRule'
import { FreeTurnEffectRule } from './rules/effects/FreeTurnEffectRule'
import { OperationMediaRule } from './rules/effects/OperationMediaRule'
import { ThePartyIsOverRule } from './rules/effects/ThePartyIsOverRule'
import { EndOfTurnRule } from './rules/EndOfTurnRule'
import { GainEnergyRule } from './rules/GainEnergyRule'
import { GainWhiteDiceTokenRule } from './rules/GainWhiteDiceTokenRule'
import { HealRule } from './rules/HealRule'
import { HibernationRule } from './rules/HibernationRule'
import { InShapeRule } from './rules/InShapeRule'
import { MadeInALabRule } from './rules/MadeInALabRule'
import { MoveBuzzTokenRule } from './rules/MoveBuzzTokenRule'
import { OnStartTurnRule } from './rules/OnStartTurnRule'
import { PullPawnRule } from './rules/PullPawnRule'
import { RebootingRule } from './rules/RebootingRule'
import { ResolveDiceRule } from './rules/ResolveDiceRule'
import { RollDiceRule } from './rules/RollDiceRule'
import { RuleId } from './rules/RuleId'
import { SmashRule } from './rules/SmashRule'
import { SuperConductorRule } from './rules/SuperConductorRule'
import { TeslaImpulseRule } from './rules/TeslaImpulseRule'
import { TitanicBatteriesRule } from './rules/TitanicBatteriesRule'
import { UnstableDnaRule } from './rules/UnstableDnaRule'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class KingOfTokyoDuelRules extends SecretMaterialRules<Monster, MaterialType, LocationType>
  implements TimeLimit<MaterialGame<Monster, MaterialType, LocationType>, MaterialMove<Monster, MaterialType, LocationType>, Monster> {
  rules = {
    [RuleId.RollDice]: RollDiceRule,
    [RuleId.PullPawn]: PullPawnRule,
    [RuleId.GainEnergy]: GainEnergyRule,
    [RuleId.Smash]: SmashRule,
    [RuleId.Buy]: BuyRule,
    [RuleId.ChangePlayer]: ChangePlayerRule,
    [RuleId.Effect]: EffectRule,
    [RuleId.Heal]: HealRule,
    [RuleId.Dominate]: DominateRule,
    [RuleId.MoveBuzzToken]: MoveBuzzTokenRule,
    [RuleId.Hibernation]: HibernationRule,
    [RuleId.InShape]: InShapeRule,
    [RuleId.MadeInALab]: MadeInALabRule,
    [RuleId.Rebooting]: RebootingRule,
    [RuleId.Camouflage]: CamouflageRule,
    [RuleId.SuperConductor]: SuperConductorRule,
    [RuleId.TitanicBatteries]: TitanicBatteriesRule,
    [RuleId.UnstableDna]: UnstableDnaRule,
    [RuleId.AfterDiceResolution]: AfterDiceResolutionRule,
    [RuleId.ResolveDice]: ResolveDiceRule,
    [RuleId.EndOfTurn]: EndOfTurnRule,
    [RuleId.TeslaImpulse]: TeslaImpulseRule,
    [RuleId.GainWhiteDiceToken]: GainWhiteDiceTokenRule,
    [RuleId.ThePartyIsOver]: ThePartyIsOverRule,
    [RuleId.FreeTurn]: FreeTurnEffectRule,
    [RuleId.OnStartTurn]: OnStartTurnRule,
    [RuleId.OperationMedia]: OperationMediaRule
  }

  hidingStrategies = {
    [MaterialType.PowerCard]: {
      //[LocationType.PowerCardDeck]: hideItemId
    }
  }

  locationsStrategies = {
    [MaterialType.PowerCard]: {
      [LocationType.PowerCardOnBoard]: new PositiveSequenceStrategy(),
      [LocationType.PowerCardDeck]: new PositiveSequenceStrategy(),
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
      [LocationType.WhiteDiceStock]: new PositiveSequenceStrategy(),
      [LocationType.OnPowerCard]: new FillGapStrategy(),
    }
  }

  giveTime(): number {
    return 60
  }
}