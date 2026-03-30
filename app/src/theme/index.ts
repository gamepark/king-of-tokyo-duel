import { css } from '@emotion/react'
import { KotdNavigation } from './KotdNavigation'

// Extracted from the game's actual UI
const green = '#50c850'
const greenLight = '#70e070'
const greenDark = '#38a038'
const navy = '#1a1a3a'
const navyLight = '#2a2a4a'
const textLight = '#e8e8f0'
const textMuted = '#a0a8b8'

export const theme = {
  root: {
    fontFamily: 'inherit',
    background: {
      image: '/cover-1920.jpg',
      overlay: 'rgba(10, 10, 30, 0.85)'
    }
  },
  palette: {
    primary: green,
    primaryHover: greenLight,
    primaryActive: greenDark,
    primaryLight: '#d0f0d0',
    primaryLighter: '#e8f8e8',
    surface: navy,
    onSurface: textLight,
    onSurfaceFocus: navyLight,
    onSurfaceActive: navy,
    danger: '#e03030',
    dangerHover: '#ffe0e0',
    dangerActive: '#ffc0c0',
    disabled: '#505868'
  },
  dialog: {
    backgroundColor: navy,
    color: textLight,
    container: css`
      background:
        radial-gradient(ellipse at 25% 15%, rgba(80, 200, 80, 0.06), transparent 50%),
        radial-gradient(ellipse at 75% 85%, rgba(100, 120, 180, 0.06), transparent 50%),
        linear-gradient(160deg, #141430 0%, ${navy} 30%, ${navyLight} 50%, ${navy} 70%, #141430 100%);
      border-radius: 0.5em;
      box-shadow:
        0 0.5em 2.5em rgba(0, 0, 0, 0.7),
        0 0 0 0.06em rgba(80, 200, 80, 0.15),
        0 0 0 0.18em rgba(0, 0, 0, 0.5);

      h2 {
        color: ${textLight};
      }

      select {
        background-color: ${navyLight};
        color: ${textLight};

        option {
          background-color: ${navy};
          color: ${textLight};
        }
      }
    `,
    content: css`
      color: ${textMuted};

      @media only screen and (max-height: 599px) {
        font-size: 2.7em;
      }

      button {
        background: linear-gradient(135deg, #1a3a2a, #2a4a38);
        color: #c0e8c0;
        border: 0.08em solid rgba(80, 200, 80, 0.25);
        border-radius: 0.3em;
        padding: 0.3em 0.8em;
        cursor: pointer;
        font-weight: bold;
        transition: all 0.15s;

        &:hover {
          background: linear-gradient(135deg, #2a4a38, #3a5a48);
          border-color: ${green};
          color: #e0ffe0;
        }

        &:disabled {
          background: #252540;
          border-color: #404050;
          color: #606878;
          cursor: default;
        }
      }
    `,
    navigation: KotdNavigation
  },
  header: {
    bar: css`
      background: linear-gradient(90deg, #101028, ${navy} 20%, ${navyLight} 50%, ${navy} 80%, #101028);
      border-top: none;
      box-shadow: 0 0.15em 0.5em rgba(0, 0, 0, 0.5);
      color: ${textLight};
    `,
    buttons: css`
      background: linear-gradient(135deg, #1a3a2a, #2a4a38);
      color: #c0e8c0;
      border: 0.08em solid rgba(80, 200, 80, 0.25);
      border-radius: 0.3em;
      padding: 0.1em 0.6em;
      font-size: 0.8em;

      &:hover {
        border-color: ${green};
        color: #e0ffe0;
      }

      &:disabled {
        background: #252540;
        border-color: #404050;
        color: #606878;
      }
    `
  },
  menu: {
    panel: css`
      background:
        radial-gradient(ellipse at 30% 20%, rgba(80, 200, 80, 0.04), transparent 50%),
        linear-gradient(160deg, #101028, ${navy}, #101028);
      color: ${textMuted};
    `
  },
  timeStats: {
    container: css`
      background: linear-gradient(160deg, #141430, ${navy}, #141430);
      color: ${textLight};

      th, td {
        color: ${textMuted};
        border-color: rgba(130, 140, 180, 0.12);
      }

      th {
        color: ${textLight};
      }
    `,
    thinkBackground: '#1a3a2a',
    waitBackground: '#2a2040'
  }
}
