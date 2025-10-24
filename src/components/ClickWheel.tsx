import React, {useCallback, useRef} from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface ClickWheelProps {
  onMenuPress: () => void;
  onPlayPausePress: () => void;
  onNextPress: () => void;
  onPreviousPress: () => void;
  onCenterPress: () => void;
  onClockwiseScroll: () => void;
  onCounterClockwiseScroll: () => void;
}

const {width} = Dimensions.get('window');
const WHEEL_SIZE = width * 0.75;
const CENTER_SIZE = WHEEL_SIZE * 0.35;

export const ClickWheel: React.FC<ClickWheelProps> = ({
  onMenuPress,
  onPlayPausePress,
  onNextPress,
  onPreviousPress,
  onCenterPress,
  onClockwiseScroll,
  onCounterClockwiseScroll,
}) => {
  const lastAngle = useRef<number>(0);

  const getAngle = (x: number, y: number) => {
    const centerX = WHEEL_SIZE / 2;
    const centerY = WHEEL_SIZE / 2;
    return Math.atan2(y - centerY, x - centerX);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const {locationX, locationY} = evt.nativeEvent;
        lastAngle.current = getAngle(locationX, locationY);
      },
      onPanResponderMove: (evt) => {
        const {locationX, locationY} = evt.nativeEvent;
        const currentAngle = getAngle(locationX, locationY);
        const diff = currentAngle - lastAngle.current;

        // Normalize the angle difference
        let normalizedDiff = diff;
        if (diff > Math.PI) {
          normalizedDiff = diff - 2 * Math.PI;
        } else if (diff < -Math.PI) {
          normalizedDiff = diff + 2 * Math.PI;
        }

        if (Math.abs(normalizedDiff) > 0.1) {
          if (normalizedDiff > 0) {
            onClockwiseScroll();
          } else {
            onCounterClockwiseScroll();
          }
          lastAngle.current = currentAngle;
        }
      },
    }),
  ).current;


  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#E8E8E8', '#C0C0C0', '#A0A0A0']}
        style={styles.wheelGradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <View style={styles.wheel} {...panResponder.panHandlers}>
          {/* Menu Button - Top */}
          <TouchableOpacity
            style={[styles.button, styles.topButton]}
            onPress={onMenuPress}>
            <Text style={styles.buttonText}>MENU</Text>
          </TouchableOpacity>

          {/* Next Button - Right */}
          <TouchableOpacity
            style={[styles.button, styles.rightButton]}
            onPress={onNextPress}>
            <Text style={styles.buttonText}>⏭</Text>
          </TouchableOpacity>

          {/* Play/Pause Button - Bottom */}
          <TouchableOpacity
            style={[styles.button, styles.bottomButton]}
            onPress={onPlayPausePress}>
            <Text style={styles.buttonText}>⏯</Text>
          </TouchableOpacity>

          {/* Previous Button - Left */}
          <TouchableOpacity
            style={[styles.button, styles.leftButton]}
            onPress={onPreviousPress}>
            <Text style={styles.buttonText}>⏮</Text>
          </TouchableOpacity>

          {/* Center Button */}
          <View style={styles.centerButton}>
            <TouchableOpacity
              style={styles.centerTouchable}
              onPress={onCenterPress}
              activeOpacity={0.7}>
              <LinearGradient
                colors={['#F5F5F5', '#D0D0D0']}
                style={styles.centerGradient}
              />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  wheelGradient: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    borderRadius: WHEEL_SIZE / 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  wheel: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    borderRadius: WHEEL_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  button: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topButton: {
    top: WHEEL_SIZE * 0.15,
  },
  rightButton: {
    right: WHEEL_SIZE * 0.15,
  },
  bottomButton: {
    bottom: WHEEL_SIZE * 0.15,
  },
  leftButton: {
    left: WHEEL_SIZE * 0.15,
  },
  buttonLabel: {
    width: 30,
    height: 30,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    textShadowColor: '#FFF',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 1,
  },
  centerButton: {
    width: CENTER_SIZE,
    height: CENTER_SIZE,
    borderRadius: CENTER_SIZE / 2,
    overflow: 'hidden',
  },
  centerTouchable: {
    width: '100%',
    height: '100%',
  },
  centerGradient: {
    width: '100%',
    height: '100%',
    borderRadius: CENTER_SIZE / 2,
  },
});

