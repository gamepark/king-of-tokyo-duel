/** @jsxImportSource @emotion/react */
import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { HelpComponents } from './HelpComponents'

export const MonsterBoardHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  const { t } = useTranslation()
  return (
    <>
      <h2>
        <Trans
          defaults="monster.board"
          values={{
            monster: t(`monster.${item.id}`)
          }}
        />
      </h2>
      <p>
        <Trans
          defaults={`monster.power.${item.id}`}
          components={HelpComponents}
        />
      </p>
    </>
  )
}