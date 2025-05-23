/** @jsxImportSource @emotion/react */
import { KingOfTokyoDuelRules } from '@gamepark/king-of-tokyo-duel/KingOfTokyoDuelRules'
import { DiceColor } from '@gamepark/king-of-tokyo-duel/material/DiceColor'
import { DiceFace } from '@gamepark/king-of-tokyo-duel/material/DiceFace'
import { CustomMoveType } from '@gamepark/king-of-tokyo-duel/rules/CustomMoveType'
import { RollHelper } from '@gamepark/king-of-tokyo-duel/rules/helper/RollHelper'
import { Picture, PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType, MaterialMove } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { diceDescription } from '../material/DiceDescription'
import { headerIconCss } from './headerIconCss'

export const ResolveDiceHeader = () => {
  const rules = useRules<KingOfTokyoDuelRules>()!
  const activePlayer = rules.getActivePlayer()
  const me = usePlayerId() === activePlayer
  const player = usePlayerName(activePlayer)
  const gainEnergy = useLegalMove((move) => isCustomMoveType(CustomMoveType.ChooseDiceFace)(move) && move.data === DiceFace.Energy)
  const smash = useLegalMove((move) => isCustomMoveType(CustomMoveType.ChooseDiceFace)(move) && move.data === DiceFace.Claw)
  const pullFamePawn = useLegalMove((move) => isCustomMoveType(CustomMoveType.ChooseDiceFace)(move) && move.data === DiceFace.Fame)
  const pullDestructionPawn = useLegalMove((move) => isCustomMoveType(CustomMoveType.ChooseDiceFace)(move) && move.data === DiceFace.Destruction)
  const heal = useLegalMove((move) => isCustomMoveType(CustomMoveType.ChooseDiceFace)(move) && move.data === DiceFace.Heal)
  const power = useLegalMove((move) => isCustomMoveType(CustomMoveType.ChooseDiceFace)(move) && move.data === DiceFace.Power)
  const rollHelper = new RollHelper(rules.game)
  if (me) {
    const faceImages = diceDescription.images[DiceColor.Red]
    return <Trans defaults="header.resolve.you" components={{
      smash: <DiceFaceButton move={smash} image={faceImages[DiceFace.Claw]} count={rollHelper.countFace(DiceFace.Claw)}/>,
      heal: <DiceFaceButton move={heal} image={faceImages[DiceFace.Heal]} count={rollHelper.countFace(DiceFace.Heal)}/>,
      energy: <DiceFaceButton move={gainEnergy} image={faceImages[DiceFace.Energy]} count={rollHelper.countFace(DiceFace.Energy)}/>,
      fame: <DiceFaceButton move={pullFamePawn} image={faceImages[DiceFace.Fame]} count={rollHelper.countFace(DiceFace.Fame)}/>,
      destruction: <DiceFaceButton move={pullDestructionPawn} image={faceImages[DiceFace.Destruction]}
                                   count={rollHelper.countFace(DiceFace.Destruction)}/>,
      power: <DiceFaceButton move={power} image={faceImages[DiceFace.Power]}
                             count={rollHelper.countFace(DiceFace.Power) - rollHelper.consumedPower}/>
    }}/>
  } else {
    return <Trans defaults="header.resolve.player" values={{ player }}/>
  }
}

type DiceFaceButtonProps = {
  move: MaterialMove
  image: string
  count: number
}

const DiceFaceButton = ({ move, image, count }: DiceFaceButtonProps) => {
  if (!move) return null
  return <PlayMoveButton move={move}><Picture css={headerIconCss} src={image}/> x {count}</PlayMoveButton>
}
