export interface Track {
  id: string;
  name: string;
  artist: string;
  album: string;
  albumArt: string;
  uri: string;
  duration: number;
  previewUrl?: string;
}

export interface Playlist {
  id: string;
  name: string;
  imageUrl: string;
  tracks: Track[];
}

export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
}

export interface Album {
  id: string;
  name: string;
  artist: string;
  imageUrl: string;
  tracks: Track[];
}

export interface MenuItem {
  id: string;
  label: string;
  type: 'menu' | 'action' | 'playlist' | 'track';
  action?: () => void;
  subItems?: MenuItem[];
  data?: any;
}

export interface SpotifyAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

export interface PlayerState {
  isPlaying: boolean;
  currentTrack: Track | null;
  position: number;
  duration: number;
  queue: Track[];
  volume: number;
}

