import React, {useState, useEffect, useCallback, useContext} from 'react';
import {View, Text, StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import {Screen} from '../components/Screen';
import {ClickWheel} from '../components/ClickWheel';
import {MenuList} from '../components/MenuList';
import {NowPlaying} from '../components/NowPlaying';
import {MenuItem, Track} from '../types';
import SpotifyService from '../services/SpotifyService';
import DemoService from '../services/DemoService';
import AudioPlayer from '../services/AudioPlayer';
import {DemoModeContext, ColorThemeContext, COLOR_THEMES} from '../../App';

type ViewMode = 'menu' | 'nowPlaying';

const IPodScreen: React.FC = () => {
  const {isDemoMode} = useContext(DemoModeContext);
  const {colorTheme, setColorTheme} = useContext(ColorThemeContext);
  const musicService = isDemoMode ? DemoService : SpotifyService;
  
  const [viewMode, setViewMode] = useState<ViewMode>('menu');
  const [menuStack, setMenuStack] = useState<MenuItem[][]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    loadMainMenu();
    
    // Setup audio player listeners
    const listener = {
      onPlay: () => setIsPlaying(true),
      onPause: () => setIsPlaying(false),
      onNext: () => updatePlayerState(),
      onPrevious: () => updatePlayerState(),
      onProgress: (pos: number, dur: number) => {
        setPosition(pos);
        setDuration(dur);
      },
      onEnd: () => updatePlayerState(),
    };
    
    AudioPlayer.addListener(listener);
    
    return () => {
      AudioPlayer.removeListener(listener);
    };
  }, []);

  const updatePlayerState = () => {
    const state = AudioPlayer.getState();
    setCurrentTrack(state.currentTrack);
    setIsPlaying(state.isPlaying);
    setPosition(state.position);
    setDuration(state.duration);
  };

  const loadMainMenu = async () => {
    const mainMenu: MenuItem[] = [
      {
        id: 'playlists',
        label: 'Playlists',
        type: 'menu',
        subItems: [],
      },
      {
        id: 'top-tracks',
        label: 'Top Tracks',
        type: 'menu',
        subItems: [],
      },
      {
        id: 'top-artists',
        label: 'Top Artists',
        type: 'menu',
        subItems: [],
      },
      {
        id: 'now-playing',
        label: 'Now Playing',
        type: 'action',
        action: () => {
          if (currentTrack) {
            setViewMode('nowPlaying');
          }
        },
      },
      {
        id: 'settings',
        label: 'Settings',
        type: 'menu',
        subItems: [
          {
            id: 'color',
            label: 'iPod Color',
            type: 'menu',
            subItems: Object.keys(COLOR_THEMES).map(key => ({
              id: `color-${key}`,
              label: COLOR_THEMES[key].name + (colorTheme.name === COLOR_THEMES[key].name ? ' ✓' : ''),
              type: 'action' as const,
              action: () => {
                setColorTheme(COLOR_THEMES[key]);
              },
            })),
          },
          {
            id: 'logout',
            label: isDemoMode ? 'Exit Demo' : 'Logout',
            type: 'action',
            action: async () => {
              await musicService.logout();
            },
          },
        ],
      },
    ];

    setMenuStack([mainMenu]);
    setSelectedIndex(0);
  };

  const loadPlaylists = async (): Promise<MenuItem[]> => {
    const playlists = await musicService.getUserPlaylists();
    return playlists.map(playlist => ({
      id: playlist.id,
      label: playlist.name,
      type: 'playlist' as const,
      data: playlist,
      subItems: [],
    }));
  };

  const loadPlaylistTracks = async (playlistId: string): Promise<MenuItem[]> => {
    const tracks = await musicService.getPlaylistTracks(playlistId);
    return tracks.map(track => ({
      id: track.id,
      label: `${track.name} - ${track.artist}`,
      type: 'track' as const,
      data: track,
    }));
  };

  const loadTopTracks = async (): Promise<MenuItem[]> => {
    const tracks = await musicService.getUserTopTracks();
    return tracks.map(track => ({
      id: track.id,
      label: `${track.name} - ${track.artist}`,
      type: 'track' as const,
      data: track,
    }));
  };

  const handleCenterPress = useCallback(async () => {
    const currentMenu = menuStack[menuStack.length - 1];
    if (!currentMenu || currentMenu.length === 0) {
      return;
    }

    const selectedItem = currentMenu[selectedIndex];

    if (selectedItem.type === 'action' && selectedItem.action) {
      selectedItem.action();
    } else if (selectedItem.type === 'track' && selectedItem.data) {
      // Play the track
      const track = selectedItem.data as Track;
      
      // Get all tracks from current menu to build queue
      const tracks = currentMenu
        .filter(item => item.type === 'track')
        .map(item => item.data as Track);
      
      AudioPlayer.setQueue(tracks, selectedIndex);
      await AudioPlayer.play();
      updatePlayerState();
      setViewMode('nowPlaying');
    } else if (selectedItem.type === 'playlist' && selectedItem.data) {
      // Load playlist tracks
      const tracks = await loadPlaylistTracks(selectedItem.data.id);
      if (tracks.length > 0) {
        setMenuStack([...menuStack, tracks]);
        setSelectedIndex(0);
      }
    } else if (selectedItem.id === 'playlists') {
      // Load playlists
      const playlists = await loadPlaylists();
      if (playlists.length > 0) {
        setMenuStack([...menuStack, playlists]);
        setSelectedIndex(0);
      }
    } else if (selectedItem.id === 'top-tracks') {
      // Load top tracks
      const tracks = await loadTopTracks();
      if (tracks.length > 0) {
        setMenuStack([...menuStack, tracks]);
        setSelectedIndex(0);
      }
    } else if (selectedItem.subItems && selectedItem.subItems.length > 0) {
      // Navigate to submenu
      setMenuStack([...menuStack, selectedItem.subItems]);
      setSelectedIndex(0);
    }
  }, [menuStack, selectedIndex, currentTrack]);

  const handleMenuPress = useCallback(() => {
    if (viewMode === 'nowPlaying') {
      setViewMode('menu');
    } else if (menuStack.length > 1) {
      // Go back
      setMenuStack(menuStack.slice(0, -1));
      setSelectedIndex(0);
    }
  }, [viewMode, menuStack]);

  const handleClockwiseScroll = useCallback(() => {
    const currentMenu = menuStack[menuStack.length - 1];
    if (currentMenu && selectedIndex < currentMenu.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  }, [menuStack, selectedIndex]);

  const handleCounterClockwiseScroll = useCallback(() => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  }, [selectedIndex]);

  const handlePlayPause = useCallback(() => {
    AudioPlayer.playPause();
  }, []);

  const handleNext = useCallback(() => {
    if (viewMode === 'menu') {
      // In menu mode, Next button scrolls down
      const currentMenu = menuStack[menuStack.length - 1];
      if (currentMenu && selectedIndex < currentMenu.length - 1) {
        setSelectedIndex(selectedIndex + 1);
      }
    } else {
      // In playing mode, Next button skips to next track
      AudioPlayer.next();
    }
  }, [viewMode, menuStack, selectedIndex]);

  const handlePrevious = useCallback(() => {
    if (viewMode === 'menu') {
      // In menu mode, Previous button scrolls up
      if (selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
      }
    } else {
      // In playing mode, Previous button goes to previous track
      AudioPlayer.previous();
    }
  }, [viewMode, selectedIndex, menuStack]);

  const currentMenu = menuStack[menuStack.length - 1] || [];
  const menuTitle = menuStack.length > 1 ? 'Menu' : 'iPod';

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colorTheme.borderColors[0]}]}>
      <StatusBar barStyle="light-content" />
      <View style={styles.banner}>
        <Text style={styles.bannerText}>✨ Classic iPod ✨</Text>
      </View>
      <View style={styles.ipodContainer}>
        <Screen>
          {viewMode === 'menu' ? (
            <MenuList
              items={currentMenu}
              selectedIndex={selectedIndex}
              title={menuTitle}
            />
          ) : currentTrack ? (
            <NowPlaying
              track={currentTrack}
              isPlaying={isPlaying}
              position={position}
              duration={duration}
            />
          ) : (
            <MenuList
              items={currentMenu}
              selectedIndex={selectedIndex}
              title={menuTitle}
            />
          )}
        </Screen>
        <ClickWheel
          onMenuPress={handleMenuPress}
          onPlayPausePress={handlePlayPause}
          onNextPress={handleNext}
          onPreviousPress={handlePrevious}
          onCenterPress={handleCenterPress}
          onClockwiseScroll={handleClockwiseScroll}
          onCounterClockwiseScroll={handleCounterClockwiseScroll}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  banner: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
  },
  bannerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 3,
    letterSpacing: 2,
  },
  ipodContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default IPodScreen;

