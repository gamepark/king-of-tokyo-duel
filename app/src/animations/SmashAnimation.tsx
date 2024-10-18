/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import { KingOfTokyoDuelRules } from '@gamepark/king-of-tokyo-duel/KingOfTokyoDuelRules'
import { LocationType } from '@gamepark/king-of-tokyo-duel/material/LocationType'
import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { Monster } from '@gamepark/king-of-tokyo-duel/material/Monster'
import { CustomMoveType } from '@gamepark/king-of-tokyo-duel/rules/CustomMoveType'
import { Source } from '@gamepark/king-of-tokyo-duel/rules/effects/EffectWithSource'
import { MaterialContext } from '@gamepark/react-game'
import { Picture } from '@gamepark/react-game/dist/components/Picture/Picture'
import { useAnimation } from '@gamepark/react-game/dist/hooks/useAnimations'
import { useMaterialContext } from '@gamepark/react-game/dist/hooks/useMaterialContext'
import { useRules } from '@gamepark/react-game/dist/hooks/useRules'
import { Material } from '@gamepark/rules-api'
import { isCustomMoveType } from '@gamepark/rules-api/dist/material/moves/CustomMove'
import { times } from 'lodash'
import { FC } from 'react'
import Hit from '../images/icons/Hit.png'

type SmashAnimationProps = {
  left: number;
  top: number
}

export const SmashAnimation: FC<SmashAnimationProps> = ({ left, top }) => {
  const animation = useAnimation((a) => isCustomMoveType(a.move) && a.move.type === CustomMoveType.Smash)
  const rules = useRules<KingOfTokyoDuelRules>()!
  //const target = rules?.remind(Memory.CurrentEffect)?.target
  const context = useMaterialContext()

  if (!animation) return null

  const target: Monster = animation.move.data.target
  if (target === undefined) return null
  const sources: Source[] = animation.move.data.sources
  if (!sources?.length) console.warn('No sources ?', animation.move)
  const monsterBoard = rules.material(MaterialType.MonsterBoard).player(target)
  const countElements = animation.move.data.effect.count
  let computedIndex = 0
  return (
    <>
      {sources.map((source) => {
        return source.indexes.map((itemIndex) => {
          const damageForIndex = (source.count ?? 0) / source.indexes.length
          return times(damageForIndex).map((currentIndex) => {
            return (
              <div key={`${itemIndex}_${currentIndex}`} css={[css`> * > * {
                height: 1.5em;
                width: 1.5em
              }`, defaultPosition(left, top), positionCss(source.type, computedIndex++, itemIndex, context, monsterBoard, countElements, animation.duration)]}>
                <Picture src={Hit}/>
              </div>
            )
          })
        })
      })}
    </>
  )

}

const animationCss = (board: Material, context: MaterialContext, initialTransform: string, index: number) => {

  const finalTransform =  getTransformFor(MaterialType.MonsterBoard, board.getIndex(), LocationType.MonsterBoard, context, 5 + (0.05 * index))
  return keyframes`
    30% {
      transform: ${initialTransform} scale(3);
    }
    35% {
      transform: ${initialTransform} scale(3);
    }
    80% {
      transform: ${finalTransform};
    }
    90% {
      transform: ${finalTransform} scale(5);
    }
    to {
      transform: ${finalTransform};
    }
  `
}

const positionCss = (type: MaterialType, index: number, itemIndex: number, context: MaterialContext, monsterBoard: Material, count: number, duration: number) => {
  const item = context.rules.material(type).getItem(itemIndex)!
  const locationType = item.location.type
  const transform = getTransformFor(type, itemIndex, locationType, context, 10 - (0.05 * index))
  const delay = 0.5
  const animationDuration = (duration - ((count - 1) * delay))
  return css`
    transform: ${transform};
    animation: ${animationDuration}s ${animationCss(monsterBoard, context, transform, index)} ease-in forwards;
    animation-delay: ${index * delay}s;
  `
}

const defaultPosition = (left: number, top: number) => css`
  position: absolute;
  left: ${left}em;
  top: ${top}em;
  transform-style: preserve-3d;
`

const getTransformFor = (type: MaterialType, itemIndex: number, location: LocationType, context: MaterialContext, translateZ: number) => {
  const item = context.rules.material(type).getItem(itemIndex)!
  return ['translate(-50%, -50%)']
    .concat(...context.locators[location]?.placeItem(item, {
      ...context,
      type: type,
      index: itemIndex,
      displayIndex: itemIndex
    }) ?? [])
    .concat(`translateZ(${translateZ}em)`)
    .concat(MaterialType.PowerCard === type ? 'translateY(3.5em)' : '')
    .filter((t) => !t.startsWith('rotate')).join(' ')
}