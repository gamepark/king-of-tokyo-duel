/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { KingOfTokyoDuelRules } from '@gamepark/king-of-tokyo-duel/KingOfTokyoDuelRules'
import { DiceColor } from '@gamepark/king-of-tokyo-duel/material/DiceColor'
import { DiceFace } from '@gamepark/king-of-tokyo-duel/material/DiceFace'
import { CustomMoveType } from '@gamepark/king-of-tokyo-duel/rules/CustomMoveType'
import { ResolveDiceRule } from '@gamepark/king-of-tokyo-duel/rules/ResolveDiceRule'
import { Picture, PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType, MaterialMove } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { diceDescription } from '../material/DiceDescription'

export const ResolveDiceHeader = () => {
  const rules = useRules<KingOfTokyoDuelRules>()!
  const activePlayer = rules.getActivePlayer()
  const me = usePlayerId() === activePlayer
  const player = usePlayerName(activePlayer)
  const gainEnergy = useLegalMove((move) => isCustomMoveType(CustomMoveType.ResolveKind)(move) && move.data === DiceFace.Energy)
  const smash = useLegalMove((move) => isCustomMoveType(CustomMoveType.ResolveKind)(move) && move.data === DiceFace.Claw)
  const pullFamePawn = useLegalMove((move) => isCustomMoveType(CustomMoveType.ResolveKind)(move) && move.data === DiceFace.Fame)
  const pullDestructionPawn = useLegalMove((move) => isCustomMoveType(CustomMoveType.ResolveKind)(move) && move.data === DiceFace.Destruction)
  const heal = useLegalMove((move) => isCustomMoveType(CustomMoveType.ResolveKind)(move) && move.data === DiceFace.Heal)
  const power = useLegalMove((move) => isCustomMoveType(CustomMoveType.ResolveKind)(move) && move.data === DiceFace.Power)
  const resolveDiceRule = new ResolveDiceRule(rules.game)
  if (me) {
    const faceImages = diceDescription.images[DiceColor.Red]
    return <Trans defaults="header.resolve.you" components={{
      smash: <DiceFaceButton move={smash} image={faceImages[DiceFace.Claw]} count={resolveDiceRule.getEffect(DiceFace.Claw)?.effect.count}/>,
      heal: <DiceFaceButton move={heal} image={faceImages[DiceFace.Heal]} count={resolveDiceRule.getEffect(DiceFace.Heal)?.effect.count}/>,
      energy: <DiceFaceButton move={gainEnergy} image={faceImages[DiceFace.Energy]} count={resolveDiceRule.getEffect(DiceFace.Energy)?.effect.count}/>,
      fame: <DiceFaceButton move={pullFamePawn} image={faceImages[DiceFace.Fame]} count={resolveDiceRule.getEffect(DiceFace.Fame)?.effect.count}/>,
      destruction: <DiceFaceButton move={pullDestructionPawn} image={faceImages[DiceFace.Destruction]}
                                   count={resolveDiceRule.getEffect(DiceFace.Destruction)?.effect.count}/>,
      power: <DiceFaceButton move={power} image={faceImages[DiceFace.Power]}
                             count={resolveDiceRule.getDiceForFace(DiceFace.Power).length - resolveDiceRule.consumedPower}/>
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
  return <PlayMoveButton move={move}><Picture css={iconCss} src={image}/> x {count}</PlayMoveButton>
}

const iconCss = css`
  height: 0.9em;
  position: relative;
  top: 0.1em;
`