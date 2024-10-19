/** @jsxImportSource @emotion/react */
import { KingOfTokyoDuelRules } from '@gamepark/king-of-tokyo-duel/KingOfTokyoDuelRules'
import { DiceColor } from '@gamepark/king-of-tokyo-duel/material/DiceColor'
import { DiceFace } from '@gamepark/king-of-tokyo-duel/material/DiceFace'
import { CustomMoveType } from '@gamepark/king-of-tokyo-duel/rules/CustomMoveType'
import { Memory } from '@gamepark/king-of-tokyo-duel/rules/Memory'
import { Picture, PlayMoveButton, useLegalMove, useLegalMoves, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { CustomMove, isCustomMoveType, MaterialMove } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { diceDescription } from '../material/DiceDescription'
import { headerIconCss } from './headerIconCss'

export const AlienoidHeader = () => {
  const rules = useRules<KingOfTokyoDuelRules>()!
  const activePlayer = rules.getActivePlayer()
  const me = usePlayerId()
  const player = usePlayerName(activePlayer)
  const moves = useLegalMoves<CustomMove>(isCustomMoveType(CustomMoveType.Alienoid))
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))
  const extra = rules.remind(Memory.AlienoidExtra) !== undefined
  if (me !== activePlayer) {
    return <Trans defaults="header.resolve.player" values={{ player }}/>
  }
  const faceImages = diceDescription.images[DiceColor.Red]
  if (!extra) {
    return <Trans defaults="header.alienoid.you" components={{
      power: <Picture css={headerIconCss} src={faceImages[DiceFace.Power]}/>,
      smash: <DiceFaceButton move={moves.find(move => move.data.face === DiceFace.Claw)} image={faceImages[DiceFace.Claw]}/>,
      heal: <DiceFaceButton move={moves.find(move => move.data.face === DiceFace.Heal)} image={faceImages[DiceFace.Heal]}/>,
      energy: <DiceFaceButton move={moves.find(move => move.data.face === DiceFace.Energy)} image={faceImages[DiceFace.Energy]}/>,
      fame: <DiceFaceButton move={moves.find(move => move.data.face === DiceFace.Fame)} image={faceImages[DiceFace.Fame]}/>,
      destruction: <DiceFaceButton move={moves.find(move => move.data.face === DiceFace.Destruction)} image={faceImages[DiceFace.Destruction]}/>
    }}/>
  } else {
    const move = moves[0]
    if (!move) return null
    return <Trans defaults="header.alienoid.extra.you" components={{
      power: <Picture css={headerIconCss} src={faceImages[DiceFace.Power]}/>,
      face: <DiceFaceButton move={move} image={faceImages[move.data.face]}/>,
      pass: <PlayMoveButton move={pass}/>
    }}/>
  }
}

type DiceFaceButtonProps = {
  move?: MaterialMove
  image: string
}

const DiceFaceButton = ({ move, image }: DiceFaceButtonProps) => {
  if (!move) return null
  return <PlayMoveButton move={move}>+1 <Picture css={headerIconCss} src={image}/></PlayMoveButton>
}
