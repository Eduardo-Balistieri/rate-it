import Animated, { Extrapolate, interpolate } from "react-native-reanimated"


const interpolateOutput = (progress: Animated.SharedValue<number>, outputRange: [number, number, number]) => {
  'worklet'
  const progressValue = progress.value
  const inputRange = [0, 0.5, 1]

  return interpolate(
    progressValue,
    inputRange,
    outputRange,
    Extrapolate.CLAMP
  )
}

export { interpolateOutput }