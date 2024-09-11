import { MaterialGameSetup } from '@gamepark/rules-api'
import { KingOfTokyoDuelOptions } from './KingOfTokyoDuelOptions'
import { KingOfTokyoDuelRules } from './KingOfTokyoDuelRules'
import { allBuzz } from './material/Buzz'
import { DiceColor } from './material/DiceColor'
import { energyCards } from './material/EnergyCard'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { MonsterBoard } from './material/MonsterBoard'
import { Pawn } from './material/Pawn'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class KingOfTokyoDuelSetup extends MaterialGameSetup<MonsterBoard, MaterialType, LocationType, KingOfTokyoDuelOptions> {
  Rules = KingOfTokyoDuelRules

  setupMaterial() {
    this.setupMonsters()
    this.setupDeck()
    this.setupBoardCards()
    this.setupHealthCounter()
    this.setupPawns()
    this.setupBuzzToken()
    this.setupDice()
  }

  setupBuzzToken() {
    const items = allBuzz.map((b) => ({
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

  setupHealthCounter() {
    for (let index = 0; index < this.players.length; index++) {
      this.material(MaterialType.HealthCounter)
        .createItem({
          location: {
            type: LocationType.HealthCounter,
            player: index + 1,
            rotation: 1
          }
        })
    }
  }

  setupMonsters(): void {
    for (let index = 0; index < this.players.length; index++) {
      const monster = this.players[index]
      this.material(MaterialType.MonsterBoard)
        .createItem({
          id: monster,
          location: {
            type: LocationType.MonsterBoard,
            player: index + 1
          }
        })
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
    this.startPlayerTurn(RuleId.PlayerTurn, this.game.players[0])
  }
}