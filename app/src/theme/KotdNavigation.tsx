import { css } from '@emotion/react'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DialogNavigationProps } from '@gamepark/react-game'
import { FC } from 'react'

export const KotdNavigation: FC<DialogNavigationProps> = ({ onPrevious, onNext, currentIndex, total }) => {
  return (
    <div css={navBarCss}>
      <button css={navBtnCss} onClick={onPrevious} disabled={!onPrevious}>
        <FontAwesomeIcon icon={faChevronLeft}/>
      </button>
      <div css={navCounterCss}>
        <div css={navDotsCss}>
          {Array.from({ length: Math.min(total, 8) }, (_, i) => (
            <div key={i} css={[navDotCss, i === Math.min(currentIndex, 7) && navDotActiveCss]}/>
          ))}
        </div>
        <span>{currentIndex + 1} / {total}</span>
      </div>
      <button css={navBtnCss} onClick={onNext} disabled={!onNext}>
        <FontAwesomeIcon icon={faChevronRight}/>
      </button>
    </div>
  )
}

const navBarCss = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 2.4em;
  padding: 0.3em 0.8em;
  border-top: 0.05em solid rgba(160, 170, 200, 0.12);
  background: linear-gradient(to top, rgba(0, 0, 0, 0.25), transparent);
`

const navBtnCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2em;
  height: 2em;
  border-radius: 50%;
  font-size: 0.7em;
  font-family: inherit;
  color: #a0a8b8;
  background: rgba(160, 170, 200, 0.08);
  border: 0.07em solid rgba(160, 170, 200, 0.2);
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: rgba(160, 170, 200, 0.15);
    border-color: rgba(160, 170, 200, 0.4);
    color: #d0d4e0;
  }

  &:disabled {
    opacity: 0.2;
    cursor: default;
  }
`

const navCounterCss = css`
  font-size: 0.65em;
  color: #808898;
  display: flex;
  align-items: center;
  gap: 0.5em;
  font-weight: 600;
`

const navDotsCss = css`
  display: flex;
  gap: 0.3em;
`

const navDotCss = css`
  width: 0.35em;
  height: 0.35em;
  border-radius: 50%;
  background: rgba(160, 170, 200, 0.2);
  transition: all 0.25s ease;
`

const navDotActiveCss = css`
  background: #a0a8b8;
  width: 1em;
  border-radius: 0.2em;
`
