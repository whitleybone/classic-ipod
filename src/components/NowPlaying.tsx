import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Track} from '../types';

interface NowPlayingProps {
  track: Track;
  isPlaying: boolean;
  position: number;
  duration: number;
}

export const NowPlaying: React.FC<NowPlayingProps> = ({
  track,
  isPlaying,
  position,
  duration,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.albumArtContainer}>
        {track.albumArt ? (
          <Image source={{uri: track.albumArt}} style={styles.albumArt} />
        ) : (
          <View style={[styles.albumArt, styles.placeholderArt]}>
            <Text style={styles.placeholderText}>♫</Text>
          </View>
        )}
      </View>
      <View style={styles.trackInfo}>
        <Text style={styles.trackName} numberOfLines={1}>
          {track.name}
        </Text>
        <Text style={styles.artistName} numberOfLines={1}>
          {track.artist}
        </Text>
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {width: `${(position / duration) * 100}%`},
            ]}
          />
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(position)}</Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
      </View>
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>{isPlaying ? '▶' : '❚❚'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A8D5E5',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumArtContainer: {
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  albumArt: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  placeholderArt: {
    backgroundColor: '#0066CC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 48,
    color: '#FFF',
  },
  trackInfo: {
    width: '100%',
    marginBottom: 15,
    alignItems: 'center',
  },
  trackName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
    textAlign: 'center',
  },
  artistName: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  progressContainer: {
    width: '100%',
    marginBottom: 10,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0066CC',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: 10,
    color: '#333',
  },
  statusContainer: {
    marginTop: 10,
  },
  statusText: {
    fontSize: 20,
    color: '#000',
  },
});

