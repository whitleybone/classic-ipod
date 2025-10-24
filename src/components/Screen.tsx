import React, {useContext} from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ColorThemeContext} from '../../App';

interface ScreenProps {
  children: React.ReactNode;
}

const {width} = Dimensions.get('window');
const SCREEN_WIDTH = width * 0.85;
const SCREEN_HEIGHT = SCREEN_WIDTH * 0.75;

export const Screen: React.FC<ScreenProps> = ({children}) => {
  const {colorTheme} = useContext(ColorThemeContext);
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.1)']}
        style={styles.screenBorder}>
        <View style={[styles.screen, {backgroundColor: colorTheme.screenColor}]}>
          <View style={[styles.displayArea, {backgroundColor: colorTheme.screenColor}]}>{children}</View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  screenBorder: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    borderRadius: 15,
    padding: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  screen: {
    width: '100%',
    height: '100%',
    backgroundColor: '#A8D5E5',
    borderRadius: 12,
    overflow: 'hidden',
  },
  displayArea: {
    flex: 1,
    backgroundColor: '#A8D5E5',
  },
});

