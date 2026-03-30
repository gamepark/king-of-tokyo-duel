import { powerCards } from '@gamepark/king-of-tokyo-duel/material/cards/PowerCard'
import { powerCardCharacteristics } from '@gamepark/king-of-tokyo-duel/material/cards/PowerCardCharacteristics'
import { Timing } from '@gamepark/king-of-tokyo-duel/material/cards/Timing'
import { Buzz } from '@gamepark/king-of-tokyo-duel/material/Buzz'
import { css } from '@emotion/react'
import { FC, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { Trans, useTranslation } from 'react-i18next'
import { HelpComponents, RedDiceComponents } from '../material/help/HelpComponents'
import { powerCardDescription } from '../material/PowerCardDescription'

const Components = { ...HelpComponents, ...RedDiceComponents }

const timingNames: Record<Timing, string> = {
  [Timing.Keep]: 'Keep',
  [Timing.Discard]: 'Discard'
}

const buzzNames: Partial<Record<Buzz, string>> = {
  [Buzz.TigerEnergy]: 'Tiger Energy',
  [Buzz.AnubisEnergyHeal]: 'Anubis Energy/Heal',
  [Buzz.CatSmash]: 'Cat Smash',
  [Buzz.DragonEnergySmashHeal]: 'Dragon Energy/Smash/Heal',
  [Buzz.PumpkinHealSmash2Heal]: 'Pumpkin Heal/Smash/2Heal',
  [Buzz.FishHeal]: 'Fish Heal',
  [Buzz.LizardSmashDice]: 'Lizard Smash/Dice',
  [Buzz.PandaDice]: 'Panda Dice',
  [Buzz.PenguinExtendSmash]: 'Penguin Extend/Smash',
  [Buzz.PhantomExtendHeal]: 'Phantom Extend/Heal',
  [Buzz.AlienShortcut]: 'Alien Shortcut',
  [Buzz.TheKingBuzz]: 'The King Buzz'
}

const SCALE_STORAGE_KEY = 'card-viewer-scale'
const getInitialScale = () => {
  const stored = localStorage.getItem(SCALE_STORAGE_KEY)
  return stored ? parseFloat(stored) : 1
}

export const CardDebugViewer: FC<{ onClose?: () => void }> = ({ onClose }) => {
  const { t } = useTranslation()
  const [timingFilter, setTimingFilter] = useState<Timing | -1>(-1)
  const [costFilter, setCostFilter] = useState<number | -1>(-1)
  const [buzzFilter, setBuzzFilter] = useState<'all' | 'yes' | 'no'>('all')
  const [search, setSearch] = useState('')
  const [scale, setScale] = useState(getInitialScale)
  const handleScaleChange = (v: number) => { setScale(v); localStorage.setItem(SCALE_STORAGE_KEY, String(v)) }

  const filteredCards = useMemo(() => {
    return powerCards.filter(card => {
      const chars = powerCardCharacteristics[card]
      if (timingFilter !== -1 && chars.timing !== timingFilter) return false
      if (costFilter !== -1 && chars.cost !== costFilter) return false
      if (buzzFilter === 'yes' && !chars.buzz) return false
      if (buzzFilter === 'no' && chars.buzz) return false
      if (search) {
        const name = t(`card.${card}`).toLowerCase()
        if (!name.includes(search.toLowerCase())) return false
      }
      return true
    })
  }, [timingFilter, costFilter, buzzFilter, search, t])

  const allCosts = useMemo(() => [...new Set(powerCards.map(c => powerCardCharacteristics[c].cost))].sort((a, b) => a - b), [])

  const handleClose = () => {
    if (onClose) onClose()
  }

  return createPortal(
    <div css={overlayCss} onClick={handleClose}>
      <div css={panelCss} onClick={e => e.stopPropagation()}>
        <div css={stickyTopCss}>
          <div css={headerCss}>
            <h2 css={titleCss}>Power Cards ({filteredCards.length}/{powerCards.length})</h2>
            <button onClick={handleClose} css={closeBtnCss}>&times;</button>
          </div>

          <div css={filtersCss}>
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              css={inputCss}
            />

            <select value={timingFilter} onChange={e => setTimingFilter(Number(e.target.value))} css={selectCss}>
              <option value={-1}>All types</option>
              {Object.entries(timingNames).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>

            <select value={costFilter} onChange={e => setCostFilter(Number(e.target.value))} css={selectCss}>
              <option value={-1}>All costs</option>
              {allCosts.map(c => <option key={c} value={c}>Cost {c}</option>)}
            </select>

            <select value={buzzFilter} onChange={e => setBuzzFilter(e.target.value as 'all' | 'yes' | 'no')} css={selectCss}>
              <option value="all">All buzz</option>
              <option value="yes">With buzz</option>
              <option value="no">Without buzz</option>
            </select>

            <button onClick={() => { setTimingFilter(-1); setCostFilter(-1); setBuzzFilter('all'); setSearch('') }} css={resetBtnCss}>
              Reset
            </button>

            <div css={sliderContainerCss}>
              <label css={sliderLabelCss}>Size {Math.round(scale * 100)}%</label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={scale}
                onChange={e => handleScaleChange(parseFloat(e.target.value))}
                css={sliderCss}
              />
            </div>
          </div>
        </div>

        <div css={gridCss} style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${Math.round(400 * scale)}px, 1fr))` }}>
          {filteredCards.map(card => {
            const chars = powerCardCharacteristics[card]
            const image = powerCardDescription.images[card]
            return (
              <div key={card} css={cardContainerCss}>
                {image && <img src={image} alt={t(`card.${card}`)} css={cardImgCss} style={{ width: `${Math.round(180 * scale)}px` }}/>}
                <div css={cardInfoCss} style={{ fontSize: `${Math.round(13 * scale)}px` }}>
                  <div css={cardNameCss} style={{ fontSize: `${Math.round(16 * scale)}px` }}>{t(`card.${card}`)}</div>
                  <div css={tagsCss}>
                    <span css={[tagCss, chars.timing === Timing.Keep ? keepTagCss : discardTagCss]}>
                      {timingNames[chars.timing]}
                    </span>
                    <span css={[tagCss, costTagCss]}>Cost {chars.cost}</span>
                    {chars.buzz !== undefined && <span css={[tagCss, buzzTagCss]}>{buzzNames[chars.buzz] ?? `Buzz ${chars.buzz}`}</span>}
                  </div>
                  <div css={detailCss}>
                    <Trans defaults={`card.effect.${card}`} components={Components}/>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>,
    document.body
  )
}

const overlayCss = css`
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: rgba(0, 0, 0, 0.9);
  overflow: auto;
`

const panelCss = css`
  max-width: 1400px;
  margin: 20px auto;
  padding: 20px;
`

const stickyTopCss = css`
  position: sticky;
  top: 0;
  background: #0a0a0a;
  z-index: 1;
  padding: 16px 0;
`

const headerCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`

const titleCss = css`
  color: #e8e8e8;
  margin: 0;
  font-size: 20px;
`

const closeBtnCss = css`
  background: none;
  border: none;
  color: #fff;
  font-size: 28px;
  cursor: pointer;
  &:hover { color: #f66; }
`

const filtersCss = css`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`

const inputCss = css`
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid #555;
  background: #222;
  color: #fff;
  font-size: 13px;
  width: 180px;
`

const selectCss = css`
  padding: 6px 8px;
  border-radius: 4px;
  border: 1px solid #555;
  background: #222;
  color: #fff;
  font-size: 13px;
`

const resetBtnCss = css`
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #666;
  background: #444;
  color: #fff;
  cursor: pointer;
  font-size: 13px;
  &:hover { background: #555; }
`

const gridCss = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 12px;
`

const cardContainerCss = css`
  display: flex;
  gap: 10px;
  background: #1a1a2e;
  border-radius: 8px;
  padding: 8px;
  border: 1px solid #333;
`

const cardImgCss = css`
  width: 180px;
  height: auto;
  border-radius: 6px;
  object-fit: contain;
`

const cardInfoCss = css`
  flex: 1;
  min-width: 0;
`

const cardNameCss = css`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 4px;
`

const tagsCss = css`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 6px;
`

const tagCss = css`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 3px;
  font-weight: bold;
`

const keepTagCss = css`
  background: #1a3a1a;
  color: #70e870;
`

const discardTagCss = css`
  background: #3a1a1a;
  color: #e87070;
`

const costTagCss = css`
  background: #3a3a1a;
  color: #e8e870;
`

const buzzTagCss = css`
  background: #2a1a3a;
  color: #c070e8;
`

const detailCss = css`
  color: #aaa;
  font-size: 13px;
  line-height: 1.5;
  white-space: pre-line;
`

const sliderContainerCss = css`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
`

const sliderLabelCss = css`
  color: #aaa;
  font-size: 12px;
  white-space: nowrap;
  min-width: 65px;
`

const sliderCss = css`
  width: 100px;
  accent-color: #7070e8;
`
