import { getEnumValues, OptionsSpec } from '@gamepark/rules-api'
import { TFunction } from 'i18next'
import { MonsterBoard } from './material/MonsterBoard'

/**
 * This is the options for each player in the game.
 */
type PlayerOptions = { monster: MonsterBoard }

/**
 * This is the type of object that the game receives when a new game is started.
 * The first generic parameter, "{}", can be changed to include game options like variants or expansions.
 */
export type KingOfTokyoDuelOptions = {
  players: PlayerOptions[]
}

/**
 * This object describes all the options a game can have, and will be used by GamePark website to create automatically forms for you game
 * (forms for friendly games, or forms for matchmaking preferences, for instance).
 */
export const KingOfTokyoDuelOptionsSpec: OptionsSpec<KingOfTokyoDuelOptions> = {
  players: {
    monster: {
      label: (t: TFunction) => t('option.monster'),
      values: getEnumValues(MonsterBoard),
      valueSpec: monster => ({ label: t => t(`monster.${monster}`) })
    }
  }
}