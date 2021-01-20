import React from 'react'
import { View } from 'react-native'

import Animated, { useAnimatedProps } from 'react-native-reanimated'
import { createPath, serialize, addQuadraticCurve, addLine } from 'react-native-redash'
import Svg, { Path } from 'react-native-svg'

import { interpolateOutput } from '../../utils/InterpolateOutput'

const AnimatedPath = Animated.createAnimatedComponent(Path)


interface MouthProps {
  progress: Animated.SharedValue<number>
  size: number
}

const Mouth = ({ progress, size }: MouthProps) => {

  // const p1 = 'M 0 50 Q 25 35 40 45 Q 75 15 100 50'
  // const p2 = 'M 0 45 Q 25 50 50 50 Q 75 50 100 45'
  // const p3 = 'M 0 35 Q 25 65 60 65 Q 80 65 100 55'

  const animatedProps = useAnimatedProps(() => {
    const a = {
      x: 0,
      y: interpolateOutput(progress, [50, 45, 35])
    }
    const b = {
      x: 25,
      y: interpolateOutput(progress, [30, 50, 65])
    }

    const c = {
      x: interpolateOutput(progress, [40, 50, 60]),
      y: interpolateOutput(progress, [45, 50, 65])
    }
    const d = {
      x: interpolateOutput(progress, [75, 75, 80]),
      y: interpolateOutput(progress, [15, 50, 65])
    }

    const e = {
      x: 100,
      y: interpolateOutput(progress, [50, 45, 55])
    }


    const path = createPath(a)
    addQuadraticCurve(path, b, c)
    addLine(path, c)

    addQuadraticCurve(path, d, e)
    addLine(path, e)

    return {
      d: serialize(path)
    }
  })


  return (
    <View
      style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}
    >
      <Svg
        width='100%' height='100%'
        viewBox={[-4, -4, 108, 108].join(' ')}
      >
        <AnimatedPath
          animatedProps={animatedProps}
          strokeWidth={4}
          stroke='#222'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </Svg>
    </View>
  )
}

export default Mouth