import { MaterialGameSetup } from '@gamepark/rules-api'
import { KingOfTokyoDuelOptions } from './KingOfTokyoDuelOptions'
import { KingOfTokyoDuelRules } from './KingOfTokyoDuelRules'
import { Buzz, commonBuzz } from './material/Buzz'
import { powerCards } from './material/cards/PowerCard'
import { DiceColor } from './material/DiceColor'
import { HealthCounter } from './material/HealthCounter'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { Monster } from './material/Monster'
import { monsterBoardDescriptions } from './material/MonsterBoardDescription'
import { Pawn } from './material/Pawn'
import { Memory } from './rules/Memory'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class KingOfTokyoDuelSetup extends MaterialGameSetup<Monster, MaterialType, LocationType, KingOfTokyoDuelOptions> {
  Rules = KingOfTokyoDuelRules

  setupMaterial() {
    this.setupDeck()
    this.setupBoardCards()
    this.setupPawns()
    this.setupBuzzToken()
    this.setupDice()
    this.setupPlayers()
  }

  setupPlayers() {
    for (const monster of this.players) {
      this.setupPlayer(monster)
    }
    this.material(MaterialType.Energy).createItem({ location: { type: LocationType.PlayerEnergy, player: this.players[1] }, quantity: 1 })
  }

  setupPlayer(monster: Monster) {
    this.setupPlayerMonster(monster)
    this.setupPlayerHealthCounter(monster)
  }

  setupBuzzToken() {
    const items = commonBuzz.map(buzz => ({
      id: buzz,
      location: {
        type: LocationType.BuzzStock,
        rotation: 0
      }
    }))

    this.material(MaterialType.Buzz).createItems(items)
  }

  setupPawns() {
    this.material(MaterialType.Pawn)
      .createItem({
        id: Pawn.Fame,
        location: {
          type: LocationType.FameTrack,
          id: Pawn.Fame,
          x: 0
        }
      })

    this.material(MaterialType.Pawn)
      .createItem({
        id: Pawn.Destruction,
        location: {
          type: LocationType.DestructionTrack,
          x: 0
        }
      })
  }

  setupPlayerHealthCounter(monster: Monster) {
    this.material(MaterialType.HealthCounter)
      .createItem({
        id: this.rules.players[0] === monster ? HealthCounter.Red : HealthCounter.Blue,
        location: {
          type: LocationType.HealthCounter,
          player: monster,
          rotation: monsterBoardDescriptions[monster].health
        }
      })
  }

  setupPlayerMonster(monster: Monster): void {
    this.material(MaterialType.MonsterBoard)
      .createItem({
        id: monster,
        location: {
          type: LocationType.MonsterBoard,
          player: monster
        }
      })

    if (monster === Monster.TheKing) {
      for (let index = 0; index < 2; index++) {
        this.material(MaterialType.Buzz)
          .createItem({
            id: Buzz.TheKingBuzz,
            location: {
              type: LocationType.PlayerBuzzToken,
              player: monster
            }
          })
      }
    }
  }

  setupDeck() {
    const cards = powerCards
      //.filter((c) => powerCardCharacteristics[c].timing === Timing.Keep)
      .map((c) => ({
        id: c,
        location: {
          type: LocationType.PowerCardDeck
        }
      }))

    this.material(MaterialType.PowerCard).createItems(cards)
    this.material(MaterialType.PowerCard).shuffle()
  }


  setupDice() {
    for (let index = 0; index < 5; index++) {
      this.material(MaterialType.Dice).createItem({
        id: DiceColor.Red,
        location: {
          type: LocationType.PlayerDiceRoll,
          player: this.players[0]
        }
      })
    }

    for (let index = 0; index < 2; index++) {
      this.material(MaterialType.Dice).createItem(({
        id: DiceColor.White,
        location: {
          type: LocationType.WhiteDiceStock
        }
      }))
    }

    this.material(MaterialType.DiceToken).createItem({ location: { type: LocationType.WhiteTokenStock }, quantity: 4 })
  }


  setupBoardCards() {
    this.material(MaterialType.PowerCard)
      .deck()
      .deal({
        type: LocationType.PowerCardOnBoard
      }, 3)
  }

  start() {
    this.memorize(Memory.ActivePlayer, this.game.players[0])
    this.memorize(Memory.Round, 1)
    this.startPlayerTurn(RuleId.RollDice, this.game.players[0])
  }
}