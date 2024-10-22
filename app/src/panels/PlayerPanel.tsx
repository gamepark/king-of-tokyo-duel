/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { KingOfTokyoDuelRules } from '@gamepark/king-of-tokyo-duel/KingOfTokyoDuelRules'
import { LocationType } from '@gamepark/king-of-tokyo-duel/material/LocationType'
import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { Monster } from '@gamepark/king-of-tokyo-duel/material/Monster'
import { Player } from '@gamepark/react-client'
import { CounterProps, StyledPlayerPanel, useRules } from '@gamepark/react-game'
import { FC, HTMLAttributes } from 'react'
import Energy from '../images/icons/Energy.png'
import Heart from '../images/icons/Heart.png'
import { monsterBoardDescription } from '../material/MonsterBoardDescription'

type PlayerPanelProps = {
  player: Player,
  index: number
} & HTMLAttributes<HTMLDivElement>

export const PlayerPanel: FC<PlayerPanelProps> = (props) => {
  const { player, index, ...rest } = props
  const rules = useRules<KingOfTokyoDuelRules>()!
  const life = rules.material(MaterialType.HealthCounter).player(player.id).getItem()!.location.rotation
  const energy = rules.material(MaterialType.Energy).location(LocationType.PlayerEnergy).player(player.id).getQuantity()

  const counters: CounterProps[] = [{
    image: Heart,
    value: life
  }, {
    image: Energy,
    value: energy
  }]

  return <StyledPlayerPanel
    activeRing
    player={player}
    counters={counters}
    backgroundImage={monsterBoardDescription.images[player.id as Monster]}
    css={panelCss}
    countersPerLine={2}
    {...rest}
  />
}

const panelCss = css`
  background-size: 130%;
  background-position: 10% 10%;
`
