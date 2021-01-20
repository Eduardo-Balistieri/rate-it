import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'

import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { Extrapolate, interpolate, interpolateColor, useAnimatedGestureHandler, useAnimatedStyle, useDerivedValue, useSharedValue } from 'react-native-reanimated'

import Eyes from '../components/Eyes'
import Mouth from '../components/Mouth'


const { width } = Dimensions.get('window')

const SLIDER_WIDTH = width * 0.5
const CONTROL_WRAPPER_SIZE = 60

const FACE_WIDTH = width > 300 ? 300 : width
const EYE_SIZE = (FACE_WIDTH / 2) - 25
const MOUTH_SIZE = (FACE_WIDTH / 2) * 0.9


const RateIt = () => {
  const controllerX = useSharedValue(-CONTROL_WRAPPER_SIZE / 2)

  const progress = useDerivedValue(() => interpolate(
    controllerX.value,
    [-CONTROL_WRAPPER_SIZE / 2 - 1, SLIDER_WIDTH - CONTROL_WRAPPER_SIZE / 2 - 1],
    [0, 1],
    Extrapolate.CLAMP
  ))


  const onSlide = useAnimatedGestureHandler({
    onStart: (event, context: any) => {
      context.translationX = controllerX.value
    },
    onActive: (event, context) => {
      const translationX = context.translationX + event.translationX
      if (translationX < -CONTROL_WRAPPER_SIZE / 2) {
        controllerX.value = -CONTROL_WRAPPER_SIZE / 2
        return
      }

      if (translationX > SLIDER_WIDTH - CONTROL_WRAPPER_SIZE / 2) {
        controllerX.value = SLIDER_WIDTH - CONTROL_WRAPPER_SIZE / 2
        return
      }

      controllerX.value = translationX
    }
  })

  const controllerPosition = useAnimatedStyle(() => {
    return {
      left: controllerX.value
    }
  })


  const backgroundColor = useDerivedValue(() => interpolateColor(
    progress.value,
    [0, 0.5, 1],
    ['#E1C0F4', '#E1D6DC', '#B6DAF0']
  ))

  const containerBackground = useAnimatedStyle((): any => {
    return {
      backgroundColor: backgroundColor.value
    }
  })

  return (
    <Animated.View style={[styles.container, containerBackground]}>
      <View style={styles.slider}>
        <PanGestureHandler onGestureEvent={onSlide}>
          <Animated.View style={[styles.controlWrapper, controllerPosition]}>
            <View style={styles.control} />
          </Animated.View>
        </PanGestureHandler>
      </View>

      <View style={styles.faceWrapper} pointerEvents='none'>
        <Eyes
          progress={progress}
          eyeSize={EYE_SIZE}
        />
        <Mouth
          progress={progress}
          size={MOUTH_SIZE}
        />
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  slider: {
    width: SLIDER_WIDTH,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#888',

    position: 'absolute',
    bottom: 60
  },

  controlWrapper: {
    position: 'absolute',
    top: -CONTROL_WRAPPER_SIZE / 2,

    height: CONTROL_WRAPPER_SIZE,
    width: CONTROL_WRAPPER_SIZE,
    borderColor: '#FFF',
    borderWidth: 1.5,
    borderRadius: CONTROL_WRAPPER_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  control: {
    width: 12,
    height: 12,
    backgroundColor: '#222',
    borderRadius: 6
  },

  faceWrapper: {
    width: FACE_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',

    position: 'absolute',
    top: 0,
    bottom: 0
  },
})

export default RateIt