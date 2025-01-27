import { AccessoriesType, AvatarProps, ClotheType, GraphicType, MouthType, TopType } from '@gamepark/avataaars'
import ClotheColorName from '@gamepark/avataaars/dist/avatar/clothes/ClotheColorName'
import SkinColor from '@gamepark/avataaars/dist/avatar/SkinColor'
import HatColorName from '@gamepark/avataaars/dist/avatar/top/HatColorName'
import { PowerCard } from '@gamepark/king-of-tokyo-duel/material/cards/PowerCard'
import { DiceColor } from '@gamepark/king-of-tokyo-duel/material/DiceColor'
import { DiceFace } from '@gamepark/king-of-tokyo-duel/material/DiceFace'
import { LocationType } from '@gamepark/king-of-tokyo-duel/material/LocationType'
import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { Monster } from '@gamepark/king-of-tokyo-duel/material/Monster'
import { Pawn } from '@gamepark/king-of-tokyo-duel/material/Pawn'
import { CustomMoveType } from '@gamepark/king-of-tokyo-duel/rules/CustomMoveType'
import { MaterialTutorial, Picture, TutorialStep } from '@gamepark/react-game'
import { isCustomMoveType, isMoveItemType, isRoll, MaterialGame, MaterialMoveRandomized } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import Destruction from '../images/icons/Destruction.png'
import Energy from '../images/icons/Energy.png'
import Fame from '../images/icons/Fame.png'
import Heart from '../images/icons/Heart.png'
import Hit from '../images/icons/Hit.png'
import { diceDescription } from '../material/DiceDescription'
import { energyTokenDescription } from '../material/EnergyTokenDescription'
import { diceIconCss, iconCss } from '../material/help/HelpComponents'
import { TutorialSetup } from './TutorialSetup'

const me = Monster.Gigazaur
const opponent = Monster.CyberKitty

const opponentAvatar: AvatarProps = {
  topType: TopType.WinterHat4,
  accessoriesType: AccessoriesType.Kurt,
  hatColor: HatColorName.PastelRed,
  clotheType: ClotheType.GraphicShirt,
  clotheColor: ClotheColorName.PastelRed,
  graphicType: GraphicType.Skull,
  mouthType: MouthType.Tongue,
  skinColor: SkinColor.Brown
}

const diceFaces = diceDescription.images[DiceColor.Red]

export class Tutorial extends MaterialTutorial<Monster, MaterialType, LocationType> {
  version = 1
  options = {
    players: [{ id: me }, { id: opponent }]
  }
  setup = new TutorialSetup()

  players = [{ id: me },
    {
      id: opponent,
      avatar: opponentAvatar
    }]

  steps: TutorialStep[] = [
    {
      popup: {
        text: () => <Trans defaults="tuto.welcome" components={{ bold: <strong/> }}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.goal" components={{
          bold: <strong/>,
          smash: <Picture css={diceIconCss} src={diceFaces[DiceFace.Claw]}/>
        }}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.monster" components={{ bold: <strong/> }}/>,
        position: { x: 30 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.MonsterBoard).id(me)],
        margin: { right: 20 }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.roll" components={{ bold: <strong/> }}/>,
        position: { x: 30 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.Dice).player(me)],
        scale: 0.5
      }),
      move: {
        randomize: (move: MaterialMoveRandomized) => {
          if (isRoll(move)) {
            switch (move.itemIndex) {
              case 0:
                move.location.rotation = DiceFace.Claw
                break
              case 1:
                move.location.rotation = DiceFace.Heal
                break
              case 2:
                move.location.rotation = DiceFace.Energy
                break
              case 3:
                move.location.rotation = DiceFace.Energy
                break
              case 4:
                move.location.rotation = DiceFace.Fame
                break
            }
          }
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.reroll" components={{ bold: <strong/> }}/>,
        position: { x: 30 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.Dice).player(me)],
        scale: 0.5
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.faces" components={{ bold: <strong/> }}/>,
        position: { x: 30 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.Dice).player(me)],
        scale: 0.5
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.keep1" components={{
          bold: <strong/>,
          smashFace: <Picture css={diceIconCss} src={diceFaces[DiceFace.Claw]}/>,
          energyFace: <Picture css={diceIconCss} src={diceFaces[DiceFace.Energy]}/>
        }}/>,
        position: { x: 30 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.Dice).player(me).rotation(r => r === DiceFace.Claw || r === DiceFace.Energy)],
        scale: 0.5
      }),
      move: {
        filter: (move, game) => {
          if (!isMoveItemType(MaterialType.Dice)(move) || move.location.type !== LocationType.PlayerDiceKeep) return false
          const face = this.material(game, move.itemType).getItem(move.itemIndex).location.rotation
          return face === DiceFace.Claw || face === DiceFace.Energy
        }
      }
    },
    {
      move: {
        filter: (move, game) => {
          if (!isMoveItemType(MaterialType.Dice)(move) || move.location.type !== LocationType.PlayerDiceKeep) return false
          const face = this.material(game, move.itemType).getItem(move.itemIndex).location.rotation
          return face === DiceFace.Claw || face === DiceFace.Energy
        }
      }
    },
    {
      move: {
        filter: (move, game) => {
          if (!isMoveItemType(MaterialType.Dice)(move) || move.location.type !== LocationType.PlayerDiceKeep) return false
          const face = this.material(game, move.itemType).getItem(move.itemIndex).location.rotation
          return face === DiceFace.Claw || face === DiceFace.Energy
        }
      }
    },
    {
      move: {
        filter: isCustomMoveType(CustomMoveType.Roll),
        randomize: (move: MaterialMoveRandomized) => {
          if (isRoll(move)) {
            switch (move.itemIndex) {
              case 1:
                move.location.rotation = DiceFace.Energy
                break
              case 4:
                move.location.rotation = DiceFace.Claw
                break
            }
          }
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.keep2" components={{ bold: <strong/> }}/>,
        position: { x: 30 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.Dice).player(me)],
        scale: 0.5
      }),
      move: {
        filter: isCustomMoveType(CustomMoveType.Pass)
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.use-dices" components={{ bold: <strong/> }}/>,
        position: { x: 30 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.Dice).player(me)],
        scale: 0.5
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.smash" components={{
          bold: <strong/>,
          smashFace: <Picture css={diceIconCss} src={diceFaces[DiceFace.Claw]}/>,
          hit: <Picture src={Hit} css={iconCss}/>,
          heart: <Picture src={Heart} css={iconCss}/>
        }}/>
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.Dice).player(me).rotation(DiceFace.Claw),
          this.material(game, MaterialType.HealthCounter).player(opponent)
        ],
        margin: { left: 15, right: 10 }
      }),
      move: {
        filter: move => isCustomMoveType(CustomMoveType.ChooseDiceFace)(move) && move.data === DiceFace.Claw
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.life" components={{ bold: <strong/> }}/>,
        position: { x: -20 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.HealthCounter).player(opponent)
        ],
        margin: { left: 40, right: 5 }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.kill" components={{ bold: <strong/> }}/>
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.HealthCounter)
        ],
        margin: { left: 5, right: 5 }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.energy" components={{
          bold: <strong/>,
          energyFace: <Picture css={diceIconCss} src={diceFaces[DiceFace.Energy]}/>,
          energy: <Picture css={iconCss} src={Energy}/>
        }}/>,
        position: { x: 20 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.Dice).player(me).rotation(DiceFace.Energy)
        ],
        staticItems: { [MaterialType.Energy]: [energyTokenDescription.staticItem] },
        scale: 0.5
      }),
      move: {
        filter: move => isCustomMoveType(CustomMoveType.ChooseDiceFace)(move) && move.data === DiceFace.Energy
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.cards" components={{
          bold: <strong/>,
          energy: <Picture css={iconCss} src={Energy}/>
        }}/>,
        position: { x: 20, y: 20 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.PowerCard).location(LocationType.PowerCardOnBoard),
          this.material(game, MaterialType.Energy).player(me)
        ],
        margin: { left: 10, right: 10 }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.cost" components={{
          bold: <strong/>,
          energy: <Picture css={iconCss} src={Energy}/>
        }}/>,
        position: { x: 10, y: 20 }
      },
      focus: (game: MaterialGame) => ({
        locations: this.material(game, MaterialType.PowerCard).location(LocationType.PowerCardOnBoard).getIndexes().map(index => ({
          type: LocationType.PowerCardCost, parent: index
        })),
        scale: 0.7
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.pass" components={{
          bold: <strong/>,
          energy: <Picture css={iconCss} src={Energy}/>
        }}/>
      },
      move: { filter: isCustomMoveType(CustomMoveType.Pass) }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.opponent" components={{ bold: <strong/> }}/>
      }
    },
    {
      move: {
        player: opponent,
        randomize: (move: MaterialMoveRandomized) => {
          if (isRoll(move)) {
            switch (move.itemIndex) {
              case 0:
                move.location.rotation = DiceFace.Claw
                break
              case 1:
                move.location.rotation = DiceFace.Heal
                break
              case 2:
                move.location.rotation = DiceFace.Energy
                break
              case 3:
                move.location.rotation = DiceFace.Energy
                break
              case 4:
                move.location.rotation = DiceFace.Claw
                break
              case 7:
                move.location.rotation = DiceFace.Claw
                break
            }
          }
        }
      }
    },
    {
      move: {
        player: opponent,
        filter: isCustomMoveType(CustomMoveType.Pass)
      }
    },
    {
      move: {
        player: opponent,
        filter: move => isCustomMoveType(CustomMoveType.ChooseDiceFace)(move) && move.data === DiceFace.Energy
      }
    },
    {
      move: {
        player: opponent,
        filter: move => isCustomMoveType(CustomMoveType.ChooseDiceFace)(move) && move.data === DiceFace.Claw
      }
    },
    {
      move: {
        player: opponent,
        filter: move => isCustomMoveType(CustomMoveType.ChooseDiceFace)(move) && move.data === DiceFace.Heal
      }
    },
    {
      move: {
        player: opponent,
        filter: isCustomMoveType(CustomMoveType.Pass)
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.turn2" components={{ bold: <strong/> }}/>
      },
      move: {
        randomize: (move: MaterialMoveRandomized) => {
          if (isRoll(move)) {
            switch (move.itemIndex) {
              case 0:
                move.location.rotation = DiceFace.Claw
                break
              case 1:
                move.location.rotation = DiceFace.Fame
                break
              case 2:
                move.location.rotation = DiceFace.Fame
                break
              case 3:
                move.location.rotation = DiceFace.Energy
                break
              case 4:
                move.location.rotation = DiceFace.Fame
                break
              case 7:
                move.location.rotation = DiceFace.Destruction
                break
            }
          }
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.fame" components={{
          bold: <strong/>,
          fame: <Picture src={Fame} css={iconCss}/>
        }}/>,
        position: { x: 20, y: 10 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.Dice).rotation(DiceFace.Fame),
          this.material(game, MaterialType.Pawn).id(Pawn.Fame)
        ],
        scale: 0.7
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.fame-marker" components={{
          bold: <strong/>
        }}/>,
        position: { x: 20, y: 10 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.Dice).rotation(DiceFace.Fame),
          this.material(game, MaterialType.Pawn).id(Pawn.Fame)
        ],
        scale: 0.7
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.keep-fame" components={{
          bold: <strong/>,
          fame: <Picture src={Fame} css={iconCss}/>,
          fameFace: <Picture css={diceIconCss} src={diceFaces[DiceFace.Fame]}/>
        }}/>,
        position: { x: 20, y: 10 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.Dice).rotation(DiceFace.Fame),
          this.material(game, MaterialType.Pawn).id(Pawn.Fame)
        ],
        scale: 0.7
      }),
      move: {
        filter: (move, game) => isMoveItemType(MaterialType.Dice)(move)
          && move.location.type === LocationType.PlayerDiceKeep
          && this.material(game, move.itemType).getItem(move.itemIndex).location.rotation === DiceFace.Fame
      }
    },
    {
      move: {
        filter: (move, game) => isMoveItemType(MaterialType.Dice)(move)
          && move.location.type === LocationType.PlayerDiceKeep
          && this.material(game, move.itemType).getItem(move.itemIndex).location.rotation === DiceFace.Fame
      }
    },
    {
      move: {
        filter: (move, game) => isMoveItemType(MaterialType.Dice)(move)
          && move.location.type === LocationType.PlayerDiceKeep
          && this.material(game, move.itemType).getItem(move.itemIndex).location.rotation === DiceFace.Fame
      }
    },
    {
      move: {
        filter: isCustomMoveType(CustomMoveType.Roll),
        randomize: (move: MaterialMoveRandomized) => {
          if (isRoll(move)) {
            switch (move.itemIndex) {
              case 0:
                move.location.rotation = DiceFace.Energy
                break
              case 3:
                move.location.rotation = DiceFace.Fame
                break
              case 7:
                move.location.rotation = DiceFace.Destruction
                break
            }
          }
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.destruction" components={{
          bold: <strong/>,
          fameFace: <Picture css={diceIconCss} src={diceFaces[DiceFace.Fame]}/>,
          destructionFace: <Picture css={diceIconCss} src={diceFaces[DiceFace.Destruction]}/>,
          destruction: <Picture css={iconCss} src={Destruction}/>
        }}/>,
        position: { x: 20, y: 25 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.Dice).rotation(DiceFace.Destruction),
          this.material(game, MaterialType.Pawn).id(Pawn.Destruction)
        ],
        scale: 0.7
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.keep-fame2" components={{
          bold: <strong/>,
          fameFace: <Picture css={diceIconCss} src={diceFaces[DiceFace.Fame]}/>
        }}/>,
        position: { x: 20, y: 25 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.Dice).rotation(DiceFace.Fame)
        ],
        scale: 0.7
      }),
      move: {
        filter: (move, game) => isMoveItemType(MaterialType.Dice)(move)
          && move.location.type === LocationType.PlayerDiceKeep
          && this.material(game, move.itemType).getItem(move.itemIndex).location.rotation === DiceFace.Fame
      }
    },
    {
      move: {
        filter: isCustomMoveType(CustomMoveType.Roll),
        randomize: (move: MaterialMoveRandomized) => {
          if (isRoll(move)) {
            switch (move.itemIndex) {
              case 0:
                move.location.rotation = DiceFace.Heal
                break
              case 7:
                move.location.rotation = DiceFace.Heal
                break
            }
          }
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.heal" components={{
          bold: <strong/>,
          italic: <em/>,
          healFace: <Picture css={diceIconCss} src={diceFaces[DiceFace.Heal]}/>,
          heart: <Picture src={Heart} css={iconCss}/>
        }}/>,
        position: { x: 20 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.Dice).rotation(DiceFace.Heal),
          this.material(game, MaterialType.HealthCounter).player(me)
        ],
        scale: 0.7
      }),
      move: {
        filter: move => isCustomMoveType(CustomMoveType.ChooseDiceFace)(move) && move.data === DiceFace.Heal
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.pull-fame" components={{
          bold: <strong/>,
          fame: <Picture src={Fame} css={iconCss}/>,
          fameFace: <Picture css={diceIconCss} src={diceFaces[DiceFace.Fame]}/>
        }}/>,
        position: { x: 20, y: 20 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.Dice).rotation(DiceFace.Fame),
          this.material(game, MaterialType.Pawn).id(Pawn.Fame)
        ],
        scale: 0.7
      }),
      move: {
        filter: move => isCustomMoveType(CustomMoveType.ChooseDiceFace)(move) && move.data === DiceFace.Fame
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.marker-win" components={{
          bold: <strong/>,
          fame: <Picture src={Fame} css={iconCss}/>,
          destruction: <Picture src={Destruction} css={iconCss}/>
        }}/>,
        position: { y: 25 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.Pawn)
        ],
        margin: { top: 3, bottom: 15 }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.spotlight" components={{
          bold: <strong/>,
          fame: <Picture src={Fame} css={iconCss}/>,
          destruction: <Picture src={Destruction} css={iconCss}/>
        }}/>,
        position: { y: 25 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.Pawn)
        ],
        locations: [{ type: LocationType.SpotlightArea, player: me }],
        margin: { bottom: 12 }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.power" components={{
          bold: <strong/>,
          powerFace: <Picture css={diceIconCss} src={diceFaces[DiceFace.Power]}/>,
          fame: <Picture src={Fame} css={iconCss}/>,
          destruction: <Picture src={Destruction} css={iconCss}/>
        }}/>,
        position: { x: 30 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.MonsterBoard).id(me)],
        margin: { right: 20 }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.buy" components={{
          bold: <strong/>,
          energy: <Picture css={iconCss} src={Energy}/>
        }}/>,
        position: { y: 15 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.Energy).player(me),
          this.material(game, MaterialType.PowerCard).id(PowerCard.Monumental)
        ],
        margin: { top: 3, bottom: 20 }
      }),
      move: {
        filter: (move, game) => isMoveItemType(MaterialType.PowerCard)(move)
          && move.itemIndex === this.material(game, MaterialType.PowerCard).id(PowerCard.Monumental).getIndex()
      }
    }
  ]
}