import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Track, Playlist, Album, Artist} from '../types';
import {encode as base64Encode} from 'base-64';

const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';
const SPOTIFY_ACCOUNTS_BASE = 'https://accounts.spotify.com';

class SpotifyService {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private clientId: string = '';
  private clientSecret: string = '';

  async initialize(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    await this.loadTokens();
  }

  private async loadTokens() {
    try {
      const access = await AsyncStorage.getItem('spotify_access_token');
      const refresh = await AsyncStorage.getItem('spotify_refresh_token');
      this.accessToken = access;
      this.refreshToken = refresh;
    } catch (error) {
      console.error('Error loading tokens:', error);
    }
  }

  private async saveTokens(accessToken: string, refreshToken?: string) {
    try {
      await AsyncStorage.setItem('spotify_access_token', accessToken);
      if (refreshToken) {
        await AsyncStorage.setItem('spotify_refresh_token', refreshToken);
      }
      this.accessToken = accessToken;
      if (refreshToken) {
        this.refreshToken = refreshToken;
      }
    } catch (error) {
      console.error('Error saving tokens:', error);
    }
  }

  async authenticate(code: string) {
    try {
      const response = await axios.post(
        `${SPOTIFY_ACCOUNTS_BASE}/api/token`,
        new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: 'ipodapp://callback',
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${base64Encode(
              `${this.clientId}:${this.clientSecret}`,
            )}`,
          },
        },
      );

      await this.saveTokens(
        response.data.access_token,
        response.data.refresh_token,
      );
      return true;
    } catch (error) {
      console.error('Authentication error:', error);
      return false;
    }
  }

  async refreshAccessToken() {
    if (!this.refreshToken) {
      return false;
    }

    try {
      const response = await axios.post(
        `${SPOTIFY_ACCOUNTS_BASE}/api/token`,
        new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: this.refreshToken,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${base64Encode(
              `${this.clientId}:${this.clientSecret}`,
            )}`,
          },
        },
      );

      await this.saveTokens(response.data.access_token);
      return true;
    } catch (error) {
      console.error('Token refresh error:', error);
      return false;
    }
  }

  private async makeRequest(
    endpoint: string,
    method: string = 'GET',
    data?: any,
  ) {
    try {
      const response = await axios({
        method,
        url: `${SPOTIFY_API_BASE}${endpoint}`,
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
        data,
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        // Token expired, try to refresh
        const refreshed = await this.refreshAccessToken();
        if (refreshed) {
          // Retry the request
          const response = await axios({
            method,
            url: `${SPOTIFY_API_BASE}${endpoint}`,
            headers: {
              Authorization: `Bearer ${this.accessToken}`,
            },
            data,
          });
          return response.data;
        }
      }
      throw error;
    }
  }

  async getUserPlaylists(): Promise<Playlist[]> {
    try {
      const data = await this.makeRequest('/me/playlists?limit=50');
      return data.items.map((item: any) => ({
        id: item.id,
        name: item.name,
        imageUrl: item.images[0]?.url || '',
        tracks: [],
      }));
    } catch (error) {
      console.error('Error fetching playlists:', error);
      return [];
    }
  }

  async getPlaylistTracks(playlistId: string): Promise<Track[]> {
    try {
      const data = await this.makeRequest(
        `/playlists/${playlistId}/tracks?limit=50`,
      );
      return data.items
        .filter((item: any) => item.track)
        .map((item: any) => ({
          id: item.track.id,
          name: item.track.name,
          artist: item.track.artists[0]?.name || 'Unknown Artist',
          album: item.track.album.name,
          albumArt: item.track.album.images[0]?.url || '',
          uri: item.track.uri,
          duration: item.track.duration_ms / 1000,
          previewUrl: item.track.preview_url,
        }));
    } catch (error) {
      console.error('Error fetching playlist tracks:', error);
      return [];
    }
  }

  async getUserTopTracks(): Promise<Track[]> {
    try {
      const data = await this.makeRequest('/me/top/tracks?limit=20');
      return data.items.map((item: any) => ({
        id: item.id,
        name: item.name,
        artist: item.artists[0]?.name || 'Unknown Artist',
        album: item.album.name,
        albumArt: item.album.images[0]?.url || '',
        uri: item.uri,
        duration: item.duration_ms / 1000,
        previewUrl: item.preview_url,
      }));
    } catch (error) {
      console.error('Error fetching top tracks:', error);
      return [];
    }
  }

  async getUserTopArtists(): Promise<Artist[]> {
    try {
      const data = await this.makeRequest('/me/top/artists?limit=20');
      return data.items.map((item: any) => ({
        id: item.id,
        name: item.name,
        imageUrl: item.images[0]?.url || '',
      }));
    } catch (error) {
      console.error('Error fetching top artists:', error);
      return [];
    }
  }

  async searchTracks(query: string): Promise<Track[]> {
    try {
      const data = await this.makeRequest(
        `/search?q=${encodeURIComponent(query)}&type=track&limit=20`,
      );
      return data.tracks.items.map((item: any) => ({
        id: item.id,
        name: item.name,
        artist: item.artists[0]?.name || 'Unknown Artist',
        album: item.album.name,
        albumArt: item.album.images[0]?.url || '',
        uri: item.uri,
        duration: item.duration_ms / 1000,
        previewUrl: item.preview_url,
      }));
    } catch (error) {
      console.error('Error searching tracks:', error);
      return [];
    }
  }

  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  async logout() {
    await AsyncStorage.removeItem('spotify_access_token');
    await AsyncStorage.removeItem('spotify_refresh_token');
    this.accessToken = null;
    this.refreshToken = null;
  }
}

export default new SpotifyService();

