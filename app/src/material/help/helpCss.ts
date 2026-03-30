import { css } from '@emotion/react'

export const helpContainerCss = css`
  display: flex;
  flex-direction: column;
  gap: 0.3em;
`

export const helpTitleCss = css`
  margin: 0;
  font-size: 1.3em;
  font-weight: 900;
  color: #f0ece0;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  line-height: 1.15;
`

export const helpSeparatorCss = css`
  height: 0.05em;
  background: linear-gradient(90deg, transparent, rgba(130, 140, 180, 0.15) 15%, rgba(130, 140, 180, 0.15) 85%, transparent);
  margin: 0.3em 0;
`

export const helpSectionCss = css`
  padding: 0.4em 0.5em;
  border-radius: 0.35em;
  background: rgba(100, 120, 180, 0.04);
  border-left: 0.15em solid rgba(130, 140, 180, 0.2);
`

export const helpTextCss = css`
  color: #b0b8d0;
  font-size: 0.92em;
  line-height: 1.6;
  white-space: pre-line;

  strong {
    color: #d0d8e8;
  }
`

export const helpSubtitleCss = css`
  font-size: 0.85em;
  font-weight: 700;
  color: #9098b0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.15em;
`

export const helpInfoCss = css`
  font-size: 0.85em;
  color: #8890a8;
  line-height: 1.5;
  white-space: pre-line;
`
