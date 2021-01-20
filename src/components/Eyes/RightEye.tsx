import React from 'react'
import { View } from 'react-native'

import Animated, { useAnimatedProps } from 'react-native-reanimated'
import { createPath, serialize, addCurve, close } from 'react-native-redash'
import Svg, { Circle, Path } from 'react-native-svg'

import { interpolateOutput } from '../../utils/InterpolateOutput'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)


interface EyeProps {
  progress: Animated.SharedValue<number>
  size: number
}

const RightEye = ({ progress, size }: EyeProps) => {

  // const p1 = 'M 0 0 C 0 0 35 100 60 100 C 85 100 90 50 100 5 C 80 5 50 10 0 0 Z'
  // const p2 = 'M 0 5 C 0 45 50 55 65 55 C 80 55 105 30 100 25 C 75 15 0 5 0 5 Z'
  // const p3 = 'M 0 50 C 0 75 25 100 50 100 C 75 100 100 75 100 50 C 100 -15 0 -15 0 50 Z'


  const animatedPathProps = useAnimatedProps(() => {
    const x = {
      x: 0,
      y: interpolateOutput(progress, [0, 5, 50])
    }
    const y = {
      x: interpolateOutput(progress, [60, 65, 50]),
      y: interpolateOutput(progress, [100, 55, 100])
    }
    const z = {
      x: 100,
      y: interpolateOutput(progress, [5, 25, 50])
    }


    const path = createPath(x)
    addCurve(path, {
      c1: {
        x: 0,
        y: interpolateOutput(progress, [0, 45, 75])
      },
      c2: {
        x: interpolateOutput(progress, [35, 50, 25]),
        y: y.y
      },
      to: y
    })

    addCurve(path, {
      c1: {
        x: interpolateOutput(progress, [85, 80, 75]),
        y: y.y
      },
      c2: {
        x: interpolateOutput(progress, [90, 105, 100]),
        y: interpolateOutput(progress, [50, 30, 75])
      },
      to: z
    })

    addCurve(path, {
      c1: {
        x: interpolateOutput(progress, [80, 75, 100]),
        y: interpolateOutput(progress, [5, 15, -15])
      },
      c2: {
        x: interpolateOutput(progress, [50, 0, 0]),
        y: interpolateOutput(progress, [10, 5, -15])
      },
      to: x
    })
    close(path)

    return {
      d: serialize(path)
    }
  })


  const animatedCircleProps = useAnimatedProps(() => {
    const cx = interpolateOutput(progress, [55, 45, 50])
    const cy = interpolateOutput(progress, [50, 30, 50])

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

export default RightEye