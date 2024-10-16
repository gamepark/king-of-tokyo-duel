/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { KingOfTokyoDuelRules } from '@gamepark/king-of-tokyo-duel/KingOfTokyoDuelRules'
import { DiceFace } from '@gamepark/king-of-tokyo-duel/material/DiceFace'
import { CustomMoveType } from '@gamepark/king-of-tokyo-duel/rules/CustomMoveType'
import { ResolveDiceRule } from '@gamepark/king-of-tokyo-duel/rules/ResolveDiceRule'
import { Picture, PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType, MaterialMove } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import RedSmashFace from '../images/dice/red/Red_Claw.png'
import RedDestructionFace from '../images/dice/red/Red_Destruction.png'
import RedEnergyFace from '../images/dice/red/Red_Energy.png'
import RedHealFace from '../images/dice/red/Red_Heart.png'
import RedPowerFace from '../images/dice/red/Red_Power.png'
import RedFameFace from '../images/dice/red/Red_Star.png'

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
    return <Trans defaults="header.resolve.you" components={{
      smash: <DiceFaceButton move={smash} image={RedSmashFace} count={resolveDiceRule.getDiceForFace(DiceFace.Claw).length}/>,
      heal: <DiceFaceButton move={heal} image={RedHealFace} count={resolveDiceRule.getDiceForFace(DiceFace.Heal).length}/>,
      energy: <DiceFaceButton move={gainEnergy} image={RedEnergyFace} count={resolveDiceRule.getDiceForFace(DiceFace.Energy).length}/>,
      fame: <DiceFaceButton move={pullFamePawn} image={RedFameFace} count={resolveDiceRule.getDiceForFace(DiceFace.Fame).length}/>,
      destruction: <DiceFaceButton move={pullDestructionPawn} image={RedDestructionFace} count={resolveDiceRule.getDiceForFace(DiceFace.Destruction).length}/>,
      power: <DiceFaceButton move={power} image={RedPowerFace} count={resolveDiceRule.getDiceForFace(DiceFace.Power).length}/>
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