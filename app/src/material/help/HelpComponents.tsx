/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Buzz } from '@gamepark/king-of-tokyo-duel/material/Buzz'
import { DiceColor } from '@gamepark/king-of-tokyo-duel/material/DiceColor'
import { DiceFace } from '@gamepark/king-of-tokyo-duel/material/DiceFace'
import { Picture } from '@gamepark/react-game'
import { buzzTokenDescription } from '../BuzzTokenDescription'
import { diceDescription } from '../DiceDescription'
import Heart from '../../images/icons/Heart.png'
import Fame from '../../images/icons/Fame.png'
import Hit from '../../images/icons/Hit.png'
import Energy from '../../images/icons/Energy.png'
import Skull from '../../images/icons/Skull.png'
import Destruction from '../../images/icons/Destruction.png'
import { diceTokenDescription } from '../DiceTokenDescription'

export const iconCss = css`
  height: 1.5em;
  position: relative;
  border-radius: 0.2em;
  top: 0.4em;
  margin-top: -0.3em;
`
export const diceIconCss = css`
  ${iconCss};
  margin-top: 0;
`

export const bigIconCss = css`
  height: 2em;
  position: relative;
  top: 0.5em;
  margin-top: 1em;
`

const diceFaces = diceDescription.images[DiceColor.Red]
const whiteDiceFaces = diceDescription.images[DiceColor.White]
export const RedDiceComponents: Record<any, any> = {
  smashFace: <Picture css={diceIconCss} src={diceFaces[DiceFace.Claw]}/>,
  heartFace: <Picture css={diceIconCss} src={diceFaces[DiceFace.Heal]}/>,
  energyFace: <Picture css={diceIconCss} src={diceFaces[DiceFace.Energy]}/>,
  fameFace: <Picture css={diceIconCss} src={diceFaces[DiceFace.Fame]}/>,
  destructionFace: <Picture css={diceIconCss} src={diceFaces[DiceFace.Destruction]}/>,
  powerFace: <Picture css={diceIconCss} src={diceFaces[DiceFace.Power]}/>,
}

export const WhiteDiceComponents: Record<any, any> = {
  smashFace: <Picture css={diceIconCss} src={whiteDiceFaces[DiceFace.Claw]}/>,
  heartFace: <Picture css={diceIconCss} src={whiteDiceFaces[DiceFace.Heal]}/>,
  energyFace: <Picture css={diceIconCss} src={whiteDiceFaces[DiceFace.Energy]}/>,
  fameFace: <Picture css={diceIconCss} src={whiteDiceFaces[DiceFace.Fame]}/>,
  destructionFace: <Picture css={diceIconCss} src={whiteDiceFaces[DiceFace.Destruction]}/>,
  powerFace: <Picture css={diceIconCss} src={whiteDiceFaces[DiceFace.Power]}/>,
}

export const HelpComponents: Record<any, any> = {
  power: <Picture css={diceIconCss} src={diceFaces[DiceFace.Power]}/>,
  smash: <Picture css={diceIconCss} src={diceFaces[DiceFace.Claw]}/>,
  hit: <Picture css={iconCss} src={Hit}/>,
  heal: <Picture css={iconCss} src={Heart}/>,
  heart: <Picture css={iconCss} src={Heart}/>,
  energy: <Picture css={iconCss} src={Energy}/>,
  fame: <Picture css={iconCss} src={Fame}/>,
  destruction: <Picture css={iconCss} src={Destruction}/>,
  dice: <Picture css={iconCss} src={diceTokenDescription.image}/>,
  death: <Picture css={iconCss} src={Skull}/>,
  kingbuzz: <Picture css={bigIconCss} src={buzzTokenDescription.images[Buzz.TheKingBuzz]}/>,
  bold: <strong />,
  italic: <em />,
}
