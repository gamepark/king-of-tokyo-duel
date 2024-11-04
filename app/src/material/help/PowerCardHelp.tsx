/** @jsxImportSource @emotion/react */
import { PowerCard } from '@gamepark/king-of-tokyo-duel/material/cards/PowerCard'
import { powerCardCharacteristics } from '@gamepark/king-of-tokyo-duel/material/cards/PowerCardCharacteristics'
import { Timing } from '@gamepark/king-of-tokyo-duel/material/cards/Timing'
import { LocationType } from '@gamepark/king-of-tokyo-duel/material/LocationType'
import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { MaterialHelpProps, PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api/dist/material/moves/items/MoveItem'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { HelpComponents, RedDiceComponents } from './HelpComponents'

export const PowerCardHelp: FC<MaterialHelpProps> = (props) => {
  const { item, itemIndex, closeDialog } = props
  const { t } = useTranslation()
  const discard = useLegalMove((move) => isMoveItemType(MaterialType.PowerCard)(move) && move.location.type === LocationType.Discard && move.itemIndex === itemIndex)
  const buy = useLegalMove((move) => isMoveItemType(MaterialType.PowerCard)(move) && move.location.type === LocationType.BuyArea && move.itemIndex === itemIndex)
  if (item.id === undefined) return null

  return (
    <>
      <h2>
        <Trans
          defaults={`card.${item.id}`}
        />
      </h2>
      {!!discard && <p><PlayMoveButton move={discard} onPlay={closeDialog}>{t('discard')}</PlayMoveButton></p>}
      {!!buy && <p><PlayMoveButton move={buy} onPlay={closeDialog}>{t('buy')}</PlayMoveButton></p>}
      <VisibleCard {...props} />
    </>
  )
}

const Components = { ...HelpComponents, ...RedDiceComponents }
const VisibleCard: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  const characteristics = powerCardCharacteristics[item.id as PowerCard]
  return (
    <>
      <p>
        <Trans
          defaults="card.cost"
          values={{ number: characteristics.cost }}
          components={Components}
        />
      </p>
      {item.location?.type === LocationType.PowerCardOnBoard && item.location?.x === 0 && (
        <p>
          <Trans
            defaults="card.cost.discount"
            components={Components}
          />
        </p>
      )}
      {characteristics.buzz !== undefined && (
        <p>
          <Trans
            defaults="card.buzz"
            components={Components}
          />
        </p>
      )}
      <p>
        <Trans
          defaults={characteristics.timing === Timing.Discard ? 'card.discard' : 'card.keep'}
          components={Components}
        />
      </p>
      <hr/>
      <p>
        <Trans
          defaults={`card.effect.${item.id}`}
          components={Components}
        />
      </p>

    </>
  )
}