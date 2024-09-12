import { MaterialGameSetup } from '@gamepark/rules-api'
import { KingOfTokyoDuelOptions } from './KingOfTokyoDuelOptions'
import { KingOfTokyoDuelRules } from './KingOfTokyoDuelRules'
import { Buzz, commonBuzz } from './material/Buzz'
import { DiceColor } from './material/DiceColor'
import { energyCards } from './material/EnergyCard'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { MonsterBoard } from './material/MonsterBoard'
import { monsterBoardDescriptions } from './material/MonsterBoardDescription'
import { Pawn } from './material/Pawn'
import { Memory } from './rules/Memory'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class KingOfTokyoDuelSetup extends MaterialGameSetup<MonsterBoard, MaterialType, LocationType, KingOfTokyoDuelOptions> {
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
  }

  setupPlayer(monster: MonsterBoard) {
    this.setupPlayerMonster(monster)
    this.setupPlayerHealthCounter(monster)
  }

  setupBuzzToken() {
    const items = commonBuzz.map((b) => ({
      id: b,
      location: {
        type: LocationType.BuzzStock
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
          x: 14
        }
      })

    this.material(MaterialType.Pawn)
      .createItem({
        id: Pawn.Destruction,
        location: {
          type: LocationType.DestructionTrack,
          x: 14
        }
      })
  }

  setupPlayerHealthCounter(monster: MonsterBoard) {
    this.material(MaterialType.HealthCounter)
      .createItem({
        location: {
          type: LocationType.HealthCounter,
          player: monster,
          rotation: monsterBoardDescriptions[monster].health
        }
      })
  }

  setupPlayerMonster(monster: MonsterBoard): void {
    this.material(MaterialType.MonsterBoard)
      .createItem({
        id: monster,
        location: {
          type: LocationType.MonsterBoard,
          player: monster
        }
      })

    if (monster === MonsterBoard.TheKing) {
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
    const cards = energyCards.map((c) => ({
      id: c,
      location: {
        type: LocationType.EnergyCardDeck
      }
    }))

    this.material(MaterialType.EnergyCard).createItems(cards)
    this.material(MaterialType.EnergyCard).shuffle()
  }


  setupDice() {
    for (let index = 0; index < 6; index++) {
      if (index % 3 === 0) {
        this.material(MaterialType.Dice).createItem(({
          id: DiceColor.White,
          location: {
            type: LocationType.PlayerDice,
            player: 1
          }
        }))
      }
      this.material(MaterialType.Dice).createItem(({
        id: DiceColor.Red,
        location: {
          type: LocationType.PlayerDice,
          player: 1
        }
      }))
    }

    this.material(MaterialType.Dice).rollItems()
  }


  setupBoardCards() {
    this.material(MaterialType.EnergyCard)
      .deck()
      .deal({
        type: LocationType.EnergyCardOnBoard
      }, 3)
  }

  start() {
    this.memorize(Memory.Round, 1)
    this.startPlayerTurn(RuleId.RollDice, this.game.players[0])
  }
}