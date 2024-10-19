/** @jsxImportSource @emotion/react */
import { KingOfTokyoDuelRules } from '@gamepark/king-of-tokyo-duel/KingOfTokyoDuelRules'
import { DiceColor } from '@gamepark/king-of-tokyo-duel/material/DiceColor'
import { DiceFace } from '@gamepark/king-of-tokyo-duel/material/DiceFace'
import { Pawn } from '@gamepark/king-of-tokyo-duel/material/Pawn'
import { CustomMoveType } from '@gamepark/king-of-tokyo-duel/rules/CustomMoveType'
import { Picture, PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType, MaterialMove } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import { diceDescription } from '../material/DiceDescription'
import { headerIconCss } from './headerIconCss'

export const GigazaurHeader = () => {
  const rules = useRules<KingOfTokyoDuelRules>()!
  const activePlayer = rules.getActivePlayer()
  const me = usePlayerId()
  const player = usePlayerName(activePlayer)
  const pullFame = useLegalMove((move) => isCustomMoveType(CustomMoveType.Pull)(move) && move.data === Pawn.Fame)
  const pullDestruction = useLegalMove((move) => isCustomMoveType(CustomMoveType.Pull)(move) && move.data === Pawn.Destruction)
  if (me !== activePlayer) {
    return <Trans defaults="header.resolve.player" values={{ player }}/>
  }
  const faceImages = diceDescription.images[DiceColor.Red]
  return <Trans defaults="header.gigazaur.you" components={{
    power: <Picture css={headerIconCss} src={faceImages[DiceFace.Power]}/>,
    fame: <PullPawnButton move={pullFame} image={faceImages[DiceFace.Fame]}/>,
    destruction: <PullPawnButton move={pullDestruction} image={faceImages[DiceFace.Destruction]}/>
  }}/>
}

type DiceFaceButtonProps = {
  move: MaterialMove
  image: string
}

const PullPawnButton = ({ move, image }: DiceFaceButtonProps) => {
  const { t } = useTranslation()
  if (!move) return null
  return <PlayMoveButton move={move}>{t('Pull')} <Picture css={headerIconCss} src={image}/></PlayMoveButton>
}
