import React from 'react'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'

import LeftEye from './LeftEye'
import RightEye from './RightEye'


interface EyesProps {
  progress: Animated.SharedValue<number>
  eyeSize: number
}

const Eyes = ({ progress, eyeSize }: EyesProps) => (
  <View style={{ flexDirection: 'row' }}>
    <LeftEye
      progress={progress}
      size={eyeSize}
    />
    <RightEye
      progress={progress}
      size={eyeSize}
    />
  </View>
)

export default Eyes