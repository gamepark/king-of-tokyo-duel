import { AccessoriesType, AvatarProps, ClotheType, GraphicType, MouthType, TopType } from '@gamepark/avataaars'
import ClotheColorName from '@gamepark/avataaars/dist/avatar/clothes/ClotheColorName'
import SkinColor from '@gamepark/avataaars/dist/avatar/SkinColor'
import HatColorName from '@gamepark/avataaars/dist/avatar/top/HatColorName'
import { LocationType } from '@gamepark/king-of-tokyo-duel/material/LocationType'
import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { Monster } from '@gamepark/king-of-tokyo-duel/material/Monster'
import { MaterialTutorial, TutorialStep } from '@gamepark/react-game'
import { Trans } from 'react-i18next'
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
    }
  ]
}