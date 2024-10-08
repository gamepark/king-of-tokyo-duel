/** @jsxImportSource @emotion/react */

import { KingOfTokyoDuelRules } from '@gamepark/king-of-tokyo-duel/KingOfTokyoDuelRules'
import { CustomMoveType } from '@gamepark/king-of-tokyo-duel/rules/CustomMoveType'
import { Memory } from '@gamepark/king-of-tokyo-duel/rules/Memory'
import { PlayMoveButton, useLegalMove, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from "@gamepark/rules-api"

export const BuyHeader = () => {
  const stop = useLegalMove((move) => isCustomMoveType(CustomMoveType.Pass)(move))
  const rules = useRules<KingOfTokyoDuelRules>()
  const hasBoughtCards = rules?.remind(Memory.BoughtCards)?.length
  return (
    <>
      <PlayMoveButton move={stop}>{hasBoughtCards? 'Stop': 'Gain 1 Energy'}</PlayMoveButton>
    </>
  )
}
