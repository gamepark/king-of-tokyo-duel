import { AccessoriesType, AvatarProps, ClotheType, GraphicType, MouthType, TopType } from '@gamepark/avataaars'
import ClotheColorName from '@gamepark/avataaars/dist/avatar/clothes/ClotheColorName'
import SkinColor from '@gamepark/avataaars/dist/avatar/SkinColor'
import HatColorName from '@gamepark/avataaars/dist/avatar/top/HatColorName'
import { DiceColor } from '@gamepark/king-of-tokyo-duel/material/DiceColor'
import { DiceFace } from '@gamepark/king-of-tokyo-duel/material/DiceFace'
import { LocationType } from '@gamepark/king-of-tokyo-duel/material/LocationType'
import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { Monster } from '@gamepark/king-of-tokyo-duel/material/Monster'
import { CustomMoveType } from '@gamepark/king-of-tokyo-duel/rules/CustomMoveType'
import { MaterialTutorial, Picture, TutorialStep } from '@gamepark/react-game'
import { isCustomMoveType, isMoveItemType, isRoll, MaterialGame, MaterialMoveRandomized } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { diceDescription } from '../material/DiceDescription'
import { diceIconCss } from '../material/help/HelpComponents'
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
    }
  ]
}