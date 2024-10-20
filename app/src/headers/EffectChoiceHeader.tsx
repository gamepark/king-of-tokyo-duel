/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { KingOfTokyoDuelRules } from '@gamepark/king-of-tokyo-duel/KingOfTokyoDuelRules'
import { CustomMoveType } from '@gamepark/king-of-tokyo-duel/rules/CustomMoveType'
import { Effect, EffectType } from '@gamepark/king-of-tokyo-duel/rules/effects/EffectType'
import { Picture, PlayMoveButton, useLegalMoves, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { CustomMove, isCustomMoveType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import Energy from '../images/icons/Energy.png'
import Heart from '../images/icons/Heart.png'
import Smash from '../images/icons/Smash.png'
import DiceToken from '../images/tokens/DiceToken.jpg'
import { headerIconCss } from './headerIconCss'

export const EffectChoiceHeader = () => {
  const rules = useRules<KingOfTokyoDuelRules>()!
  const activePlayer = rules.getActivePlayer()
  const me = usePlayerId()
  const player = usePlayerName(activePlayer)
  if (me !== activePlayer) {
    return <Trans defaults="header.effect-choice.player" values={{ player }}/>
  }
  return <Trans defaults="header.effect-choice.you" components={{
    effects: <EffectChoiceButtons/>
  }}/>
}

const EffectChoiceButtons = () => {
  const moves = useLegalMoves<CustomMove>(isCustomMoveType(CustomMoveType.ChooseEffect))
  return <>
    {moves.map((move, index) => <PlayMoveButton key={index} move={move} css={marginRight}><EffectButtonContent effect={move.data.effect}/></PlayMoveButton>)}
  </>
}

const EffectButtonContent = ({ effect }: { effect: Effect }) => {
  switch (effect.type) {
    case EffectType.Smash:
      return <><Picture src={Smash} css={headerIconCss}/></>
    case EffectType.GainEnergy:
      return <><Picture src={Energy} css={headerIconCss}/></>
    case EffectType.GetWhiteDiceToken:
      return <><Picture src={DiceToken} css={headerIconCss}/></>
    case EffectType.Heal:
      return <><Picture src={Heart} css={headerIconCss}/></>
    default:
      console.error(`Missing button for effect choice: ${effect}`)
      return null
  }
}

const marginRight = css`
  margin-right: 0.3em;
`
