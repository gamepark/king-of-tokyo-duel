import { css } from '@emotion/react'
import { KingOfTokyoDuelRules } from '@gamepark/king-of-tokyo-duel/KingOfTokyoDuelRules'
import { PowerCard } from '@gamepark/king-of-tokyo-duel/material/cards/PowerCard'
import { powerCardCharacteristics } from '@gamepark/king-of-tokyo-duel/material/cards/PowerCardCharacteristics'
import { Timing } from '@gamepark/king-of-tokyo-duel/material/cards/Timing'
import { LocationType } from '@gamepark/king-of-tokyo-duel/material/LocationType'
import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { MaterialHelpProps, Picture, PlayMoveButton, useLegalMove, useRules } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { buzzTokenDescription } from '../BuzzTokenDescription'
import { HelpComponents, RedDiceComponents } from './HelpComponents'

const Components = { ...HelpComponents, ...RedDiceComponents }

export const PowerCardHelp: FC<MaterialHelpProps> = (props) => {
  const { item, itemIndex, closeDialog } = props
  const { t } = useTranslation()
  const discard = useLegalMove((move) => isMoveItemType(MaterialType.PowerCard)(move) && move.location.type === LocationType.Discard && move.itemIndex === itemIndex)
  const buy = useLegalMove((move) => isMoveItemType(MaterialType.PowerCard)(move) && move.location.type === LocationType.BuyArea && move.itemIndex === itemIndex)

  if (item.location?.type === LocationType.PowerCardDeck) return <PowerCardDeckHelp/>
  if (item.id === undefined) return null

  const characteristics = powerCardCharacteristics[item.id as PowerCard]
  const isKeep = characteristics.timing === Timing.Keep
  const hasDiscount = item.location?.type === LocationType.PowerCardOnBoard && item.location?.x === 0

  return (
    <div css={containerCss}>
      <h2 css={titleCss}>
        <Trans i18nKey={`card.${item.id}`}/>
      </h2>

      <div css={metaRowCss}>
        <div css={chipCss}>
          {characteristics.cost}
          <span css={costEnergyCss}>{Components.energy}</span>
          {hasDiscount && <span css={discountBadgeCss}>-1</span>}
        </div>
        <div css={[chipCss, isKeep ? keepCss : discardCss]}>
          {isKeep ? 'KEEP' : 'DISCARD'}
        </div>
      </div>
      <div css={timingDescCss}>
        <Trans i18nKey={isKeep ? 'card.keep' : 'card.discard'} components={Components}/>
      </div>

      {characteristics.buzz !== undefined && (
        <div css={buzzRowCss}>
          <Picture src={buzzTokenDescription.images[characteristics.buzz]} css={buzzImgCss}/>
          <span css={buzzLabelCss}>
            Buzz — <Trans i18nKey={`card.buzz`} components={Components}/>
          </span>
        </div>
      )}

      <div css={separatorCss}/>

      <div css={effectBlockCss}>
        <div css={effectTextCss}>
          <Trans i18nKey={`card.effect.${item.id}`} components={Components}/>
        </div>
      </div>

      {(buy || discard) && (
        <div css={actionsCss}>
          {buy && (
            <PlayMoveButton move={buy} onPlay={closeDialog} css={buyBtnCss}>
              {t('buy')}
            </PlayMoveButton>
          )}
          {discard && (
            <PlayMoveButton move={discard} onPlay={closeDialog} css={discardBtnCss}>
              {t('discard')}
            </PlayMoveButton>
          )}
        </div>
      )}
    </div>
  )
}

const PowerCardDeckHelp = () => {
  const { t } = useTranslation()
  const rules = useRules<KingOfTokyoDuelRules>()!
  const number = rules.material(MaterialType.PowerCard).location(LocationType.PowerCardDeck).length
  return (
    <div css={containerCss}>
      <h2 css={titleCss}>{t('deck')}</h2>
      <div css={separatorCss}/>
      <p css={effectTextCss}>{t('deck.help', { number })}</p>
    </div>
  )
}

const containerCss = css`
  display: flex;
  flex-direction: column;
  gap: 0.3em;
`

const titleCss = css`
  margin: 0;
  font-size: 1.3em;
  font-weight: 900;
  color: #f0ece0;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  line-height: 1.15;
`

const metaRowCss = css`
  display: flex;
  align-items: center;
  gap: 0.6em;
`

const chipCss = css`
  display: inline-flex;
  align-items: center;
  gap: 0.2em;
  padding: 0.2em 0.5em;
  border-radius: 0.3em;
  font-weight: 700;
  font-size: 0.85em;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: rgba(232, 160, 32, 0.12);
  border: 0.05em solid rgba(232, 160, 32, 0.25);
  color: #e8c050;
`

const costEnergyCss = css`
  display: inline-flex;
  img, picture {
    height: 1.2em !important;
    margin: 0 !important;
    top: 0 !important;
    position: relative !important;
  }
`

const discountBadgeCss = css`
  font-size: 0.75em;
  font-weight: 700;
  color: #60e060;
  background: rgba(80, 220, 80, 0.15);
  padding: 0.05em 0.3em;
  border-radius: 0.2em;
  margin-left: 0.2em;
`

const keepCss = css`
  background: rgba(70, 165, 90, 0.1);
  color: #68c478;
  border: 0.05em solid rgba(70, 165, 90, 0.22);
`

const discardCss = css`
  background: rgba(210, 130, 50, 0.1);
  color: #d0a050;
  border: 0.05em solid rgba(210, 130, 50, 0.22);
`

const timingDescCss = css`
  font-size: 0.78em;
  color: #707898;
  font-style: italic;
  line-height: 1.4;
`

const buzzRowCss = css`
  display: flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.2em 0;
`

const buzzImgCss = css`
  height: 2.5em;
  object-fit: contain;
`

const buzzLabelCss = css`
  font-size: 0.8em;
  color: #7880a0;
`

const separatorCss = css`
  height: 0.05em;
  background: linear-gradient(90deg, transparent, rgba(130, 140, 180, 0.15) 15%, rgba(130, 140, 180, 0.15) 85%, transparent);
  margin: 0.3em 0;
`

const effectBlockCss = css`
  padding: 0.4em 0.5em;
  border-radius: 0.35em;
  background: rgba(100, 120, 180, 0.04);
  border-left: 0.15em solid rgba(130, 140, 180, 0.2);
`

const effectTextCss = css`
  color: #b0b8d0;
  font-size: 0.92em;
  line-height: 1.6;
  white-space: pre-line;

  strong {
    color: #d0d8e8;
  }
`

const actionsCss = css`
  display: flex;
  gap: 0.5em;
  margin-top: 0.4em;
`

const btnBaseCss = css`
  flex: 1;
  padding: 0.45em 0.8em;
  font-size: 0.9em;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border-radius: 0.35em;
  cursor: pointer;
  transition: all 0.15s;
`

const buyBtnCss = css`
  ${btnBaseCss};
  background: rgba(70, 165, 90, 0.12);
  color: #68c478;
  border: 0.05em solid rgba(70, 165, 90, 0.25);

  &:hover {
    background: rgba(70, 165, 90, 0.22);
    border-color: rgba(70, 165, 90, 0.45);
    color: #88e898;
    box-shadow: 0 0 1em rgba(70, 165, 90, 0.1);
  }
`

const discardBtnCss = css`
  ${btnBaseCss};
  background: rgba(210, 130, 50, 0.12);
  color: #d0a050;
  border: 0.05em solid rgba(210, 130, 50, 0.25);

  &:hover {
    background: rgba(210, 130, 50, 0.22);
    border-color: rgba(210, 130, 50, 0.45);
    color: #e8b868;
    box-shadow: 0 0 1em rgba(210, 130, 50, 0.1);
  }
`
