/** @jsxImportSource @emotion/react */
import { KingOfTokyoDuelRules } from '@gamepark/king-of-tokyo-duel/KingOfTokyoDuelRules'
import { LocationType } from '@gamepark/king-of-tokyo-duel/material/LocationType'
import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { CustomMoveType } from '@gamepark/king-of-tokyo-duel/rules/CustomMoveType'
import { Memory } from '@gamepark/king-of-tokyo-duel/rules/Memory'
import { RollDiceRule } from '@gamepark/king-of-tokyo-duel/rules/RollDiceRule'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType, isMoveItemType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const RollDiceHeader = () => {
  const rules = useRules<KingOfTokyoDuelRules>()!
  const activePlayer = rules.getActivePlayer()
  const me = usePlayerId()
  const player = usePlayerName(activePlayer)
  const rollCount = rules.remind(Memory.RollCount) ?? 0
  const rollLeft = new RollDiceRule(rules.game).maxRollCount - rollCount
  const roll = useLegalMove((move) => isCustomMoveType(CustomMoveType.Roll)(move))
  const dice = rules.material(MaterialType.Dice).location(LocationType.PlayerDiceRoll).player(activePlayer).length
  const addDice = useLegalMove(isMoveItemType(MaterialType.DiceToken))
  const stop = useLegalMove((move) => isCustomMoveType(CustomMoveType.Pass)(move))
  if (me !== activePlayer) {
    return <Trans defaults="header.roll.player" values={{ player, rollLeft }}/>
  }
  if (rollCount === 0) {
    return <Trans defaults="header.roll.you" components={{
      roll: <PlayMoveButton move={roll}/>,
      add: <PlayMoveButton move={addDice}/>
    }}/>
  } else {
    return <Trans defaults="header.reroll.you" values={{ dice, rollLeft }} components={{
      roll: <PlayMoveButton move={roll}/>,
      stop: <PlayMoveButton move={stop}/>
    }}/>
  }
}
