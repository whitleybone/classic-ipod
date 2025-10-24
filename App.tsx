import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import TrackPlayer from 'react-native-track-player';
import {AuthScreen} from './src/screens/AuthScreen';
import IPodScreen from './src/screens/iPodScreen';

// Setup audio player
TrackPlayer.setupPlayer();

// Color theme types
export type ColorTheme = {
  name: string;
  wheelColors: [string, string];
  screenColor: string;
  borderColors: [string, string];
};

export const COLOR_THEMES: {[key: string]: ColorTheme} = {
  white: {
    name: 'Classic White',
    wheelColors: ['#F5F5F5', '#E0E0E0'],
    screenColor: '#A8D5E5',
    borderColors: ['#FFFFFF', '#F0F0F0'],
  },
  black: {
    name: 'Classic Black',
    wheelColors: ['#F5F5F5', '#E0E0E0'],
    screenColor: '#A8D5E5',
    borderColors: ['#2C2C2C', '#1A1A1A'],
  },
  pink: {
    name: 'Pink',
    wheelColors: ['#F5F5F5', '#E0E0E0'],
    screenColor: '#A8D5E5',
    borderColors: ['#FFB3D9', '#FF8DC7'],
  },
  glitterypink: {
    name: 'Hot Pink',
    wheelColors: ['#F5F5F5', '#E0E0E0'],
    screenColor: '#A8D5E5',
    borderColors: ['#FF1493', '#FF1493'],
  },
  blue: {
    name: 'Blue',
    wheelColors: ['#F5F5F5', '#E0E0E0'],
    screenColor: '#A8D5E5',
    borderColors: ['#87CEEB', '#5AB9E8'],
  },
  green: {
    name: 'Green',
    wheelColors: ['#F5F5F5', '#E0E0E0'],
    screenColor: '#A8D5E5',
    borderColors: ['#90EE90', '#70DD70'],
  },
  red: {
    name: 'Product RED',
    wheelColors: ['#F5F5F5', '#E0E0E0'],
    screenColor: '#A8D5E5',
    borderColors: ['#E74C3C', '#D03C2B'],
  },
  purple: {
    name: 'Purple',
    wheelColors: ['#F5F5F5', '#E0E0E0'],
    screenColor: '#A8D5E5',
    borderColors: ['#9B59B6', '#8D4CA8'],
  },
  orange: {
    name: 'Orange',
    wheelColors: ['#F5F5F5', '#E0E0E0'],
    screenColor: '#A8D5E5',
    borderColors: ['#FFA500', '#FF9C10'],
  },
};

// Create a context to share demo mode state
export const DemoModeContext = React.createContext({
  isDemoMode: true,
  setDemoMode: (mode: boolean) => {},
});

// Create a context to share color theme
export const ColorThemeContext = React.createContext({
  colorTheme: COLOR_THEMES.white,
  setColorTheme: (theme: ColorTheme) => {},
});

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [colorTheme, setColorTheme] = useState<ColorTheme>(COLOR_THEMES.white);

  const demoContextValue = {
    isDemoMode,
    setDemoMode: setIsDemoMode,
  };

  const colorContextValue = {
    colorTheme,
    setColorTheme,
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <DemoModeContext.Provider value={demoContextValue}>
        <ColorThemeContext.Provider value={colorContextValue}>
          <NavigationContainer>
            {isAuthenticated ? (
              <IPodScreen />
            ) : (
              <AuthScreen onAuthenticated={() => setIsAuthenticated(true)} />
            )}
          </NavigationContainer>
        </ColorThemeContext.Provider>
      </DemoModeContext.Provider>
    </GestureHandlerRootView>
  );
}
