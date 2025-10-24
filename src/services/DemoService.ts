import {Track, Playlist, Artist} from '../types';

// Demo data with sample tracks
class DemoService {
  private demoTracks: Track[] = [
    {
      id: 'demo-1',
      name: 'Bohemian Rhapsody',
      artist: 'Queen',
      album: 'A Night at the Opera',
      albumArt: 'https://i.scdn.co/image/ab67616d0000b273ce4f1737bc8a646c8c4bd25a',
      uri: 'demo:track:1',
      duration: 354,
      previewUrl: 'https://p.scdn.co/mp3-preview/9b1a4c7e0ca5ff5c17bb2e9c3d49ccb3f1c2d7b0',
    },
    {
      id: 'demo-2',
      name: 'Stairway to Heaven',
      artist: 'Led Zeppelin',
      album: 'Led Zeppelin IV',
      albumArt: 'https://i.scdn.co/image/ab67616d0000b273c8a11e48c91a982d086afc69',
      uri: 'demo:track:2',
      duration: 482,
      previewUrl: 'https://p.scdn.co/mp3-preview/8b1e6c7e0ca5ff5c17bb2e9c3d49ccb3f1c2d7b1',
    },
    {
      id: 'demo-3',
      name: 'Hotel California',
      artist: 'Eagles',
      album: 'Hotel California',
      albumArt: 'https://i.scdn.co/image/ab67616d0000b2734637341b9f507521afa9a778',
      uri: 'demo:track:3',
      duration: 391,
      previewUrl: 'https://p.scdn.co/mp3-preview/7c1e6c7e0ca5ff5c17bb2e9c3d49ccb3f1c2d7b2',
    },
    {
      id: 'demo-4',
      name: 'Imagine',
      artist: 'John Lennon',
      album: 'Imagine',
      albumArt: 'https://i.scdn.co/image/ab67616d0000b2736e3159c3db9f8a4f8f0a4eb8',
      uri: 'demo:track:4',
      duration: 183,
      previewUrl: 'https://p.scdn.co/mp3-preview/6d1e6c7e0ca5ff5c17bb2e9c3d49ccb3f1c2d7b3',
    },
    {
      id: 'demo-5',
      name: 'Sweet Child O\' Mine',
      artist: 'Guns N\' Roses',
      album: 'Appetite for Destruction',
      albumArt: 'https://i.scdn.co/image/ab67616d0000b273d3bfc3ca97a94cab0c6712f1',
      uri: 'demo:track:5',
      duration: 356,
      previewUrl: 'https://p.scdn.co/mp3-preview/5e1e6c7e0ca5ff5c17bb2e9c3d49ccb3f1c2d7b4',
    },
    {
      id: 'demo-6',
      name: 'Billie Jean',
      artist: 'Michael Jackson',
      album: 'Thriller',
      albumArt: 'https://i.scdn.co/image/ab67616d0000b2735ef878a782c987d38d82b605',
      uri: 'demo:track:6',
      duration: 294,
      previewUrl: 'https://p.scdn.co/mp3-preview/4f1e6c7e0ca5ff5c17bb2e9c3d49ccb3f1c2d7b5',
    },
    {
      id: 'demo-7',
      name: 'Smells Like Teen Spirit',
      artist: 'Nirvana',
      album: 'Nevermind',
      albumArt: 'https://i.scdn.co/image/ab67616d0000b273e175a19e530c898d167d39bf',
      uri: 'demo:track:7',
      duration: 301,
      previewUrl: 'https://p.scdn.co/mp3-preview/3g1e6c7e0ca5ff5c17bb2e9c3d49ccb3f1c2d7b6',
    },
    {
      id: 'demo-8',
      name: 'Wonderwall',
      artist: 'Oasis',
      album: '(What\'s the Story) Morning Glory?',
      albumArt: 'https://i.scdn.co/image/ab67616d0000b273ca11d58fbbde2c3f5b70bbac',
      uri: 'demo:track:8',
      duration: 258,
      previewUrl: 'https://p.scdn.co/mp3-preview/2h1e6c7e0ca5ff5c17bb2e9c3d49ccb3f1c2d7b7',
    },
    {
      id: 'demo-9',
      name: 'Bohemian Like You',
      artist: 'The Dandy Warhols',
      album: 'Thirteen Tales from Urban Bohemia',
      albumArt: 'https://i.scdn.co/image/ab67616d0000b273f7e9e24e7622b9e30f6ae7ef',
      uri: 'demo:track:9',
      duration: 208,
      previewUrl: 'https://p.scdn.co/mp3-preview/1i1e6c7e0ca5ff5c17bb2e9c3d49ccb3f1c2d7b8',
    },
    {
      id: 'demo-10',
      name: 'Don\'t Stop Believin\'',
      artist: 'Journey',
      album: 'Escape',
      albumArt: 'https://i.scdn.co/image/ab67616d0000b2733fd4bb14d9a1352c7cea2576',
      uri: 'demo:track:10',
      duration: 250,
      previewUrl: 'https://p.scdn.co/mp3-preview/0j1e6c7e0ca5ff5c17bb2e9c3d49ccb3f1c2d7b9',
    },
  ];

  private demoPlaylists: Playlist[] = [
    {
      id: 'demo-playlist-1',
      name: 'Classic Rock Hits',
      imageUrl: 'https://i.scdn.co/image/ab67706f00000002ca5a7517156021292926a638',
      tracks: [],
    },
    {
      id: 'demo-playlist-2',
      name: 'Throwback Jams',
      imageUrl: 'https://i.scdn.co/image/ab67706f00000002b0ad93e3a90b4e0e16ecd1e0',
      tracks: [],
    },
    {
      id: 'demo-playlist-3',
      name: 'Road Trip Mix',
      imageUrl: 'https://i.scdn.co/image/ab67706f00000002e342e65c7b71c1c77c4e1c2f',
      tracks: [],
    },
  ];

  private demoArtists: Artist[] = [
    {
      id: 'demo-artist-1',
      name: 'Queen',
      imageUrl: 'https://i.scdn.co/image/b040846ceba13c3e9c125d68389491094e7f2982',
    },
    {
      id: 'demo-artist-2',
      name: 'Led Zeppelin',
      imageUrl: 'https://i.scdn.co/image/207803ce008388d3427a685254f9de6a8f61dc2e',
    },
    {
      id: 'demo-artist-3',
      name: 'Eagles',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb8eb0c42838cea21ff9d0a4f3',
    },
  ];

  async getUserPlaylists(): Promise<Playlist[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.demoPlaylists;
  }

  async getPlaylistTracks(playlistId: string): Promise<Track[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Return different tracks for different playlists
    if (playlistId === 'demo-playlist-1') {
      return this.demoTracks.slice(0, 5);
    } else if (playlistId === 'demo-playlist-2') {
      return this.demoTracks.slice(5, 8);
    } else {
      return this.demoTracks.slice(3, 7);
    }
  }

  async getUserTopTracks(): Promise<Track[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.demoTracks.slice(0, 7);
  }

  async getUserTopArtists(): Promise<Artist[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.demoArtists;
  }

  async searchTracks(query: string): Promise<Track[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Simple search implementation
    const lowerQuery = query.toLowerCase();
    return this.demoTracks.filter(
      track =>
        track.name.toLowerCase().includes(lowerQuery) ||
        track.artist.toLowerCase().includes(lowerQuery) ||
        track.album.toLowerCase().includes(lowerQuery)
    );
  }

  isAuthenticated(): boolean {
    return true; // Always authenticated in demo mode
  }

  async logout() {
    // No-op in demo mode
  }
}

export default new DemoService();

