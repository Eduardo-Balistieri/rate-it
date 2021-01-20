import React from 'react'
import { View } from 'react-native'

import Animated, { useAnimatedProps } from 'react-native-reanimated'
import { createPath, serialize, addCurve, close } from 'react-native-redash'
import Svg, { Path, Circle } from 'react-native-svg'

import { interpolateOutput } from '../../utils/InterpolateOutput'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)


interface EyeProps {
  progress: Animated.SharedValue<number>
  size: number
}

const LeftEye = ({ progress, size }: EyeProps) => {

  // const p1 = 'M 0 0 C 0 0 25 90 50 90 C 75 90 85 50 100 0 C 75 0 25 10 0 0 Z'
  // const p2 = 'M 0 15 C 0 45 20 55 45 55 C 75 55 100 10 100 5 C 75 5 0 10 0 15 Z'
  // const p3 = 'M 5 50 C 5 75 25 100 50 100 C 75 100 95 75 95 50 C 100 -15 5 -15 5 50 Z'


  const animatedPathProps = useAnimatedProps(() => {
    const x = {
      x: interpolateOutput(progress, [0, 0, 5]),
      y: interpolateOutput(progress, [0, 15, 50])
    }
    const y = {
      x: interpolateOutput(progress, [50, 45, 50]),
      y: interpolateOutput(progress, [90, 55, 100])
    }
    const z = {
      x: interpolateOutput(progress, [100, 100, 95]),
      y: interpolateOutput(progress, [0, 5, 50])
    }


    const path = createPath(x)
    addCurve(path, {
      c1: {
        x: interpolateOutput(progress, [0, 0, 5]),
        y: interpolateOutput(progress, [0, 45, 75])
      },
      c2: {
        x: interpolateOutput(progress, [25, 20, 25]),
        y: y.y
      },
      to: y
    })

    addCurve(path, {
      c1: {
        x: 75,
        y: y.y
      },
      c2: {
        x: interpolateOutput(progress, [85, 100, 95]),
        y: interpolateOutput(progress, [50, 10, 75])
      },
      to: z
    })

    addCurve(path, {
      c1: {
        x: interpolateOutput(progress, [75, 75, 100]),
        y: interpolateOutput(progress, [0, 5, -15])
      },
      c2: {
        x: interpolateOutput(progress, [25, 0, 5]),
        y: interpolateOutput(progress, [10, 10, -15])
      },
      to: x
    })
    close(path)

    return {
      d: serialize(path)
    }
  })


  const animatedCircleProps = useAnimatedProps(() => {
    const cx = interpolateOutput(progress, [50, 45, 50])
    const cy = interpolateOutput(progress, [45, 30, 50])

    return { cx, cy }
  })

  return (
    <View
      style={{ flex: 1, width: size, height: size, justifyContent: 'center', alignItems: 'center' }}
    >
      <Svg
        width='100%' height='100%'
        viewBox={[-4, -4, 108, 108].join(' ')}
      >
        <AnimatedPath
          animatedProps={animatedPathProps}
          fill='#FFF'
          stroke='#222'
          strokeWidth={4}
          strokeLinecap='round'
          strokeLinejoin='round'
        />

        <AnimatedCircle
          fill='#222'
          r='4'
          animatedProps={animatedCircleProps}
        />
      </Svg>
    </View>
  )
}

export default LeftEye