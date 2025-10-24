export const SPOTIFY_CONFIG = {
  clientId: '', // Will be set at runtime from user input
  clientSecret: '', // Will be set at runtime from user input
  redirectUri: 'ipodapp://callback',
  scopes: [
    'user-read-private',
    'user-read-email',
    'user-library-read',
    'user-top-read',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
  ],
};

export const getAuthorizationUrl = (clientId: string): string => {
  const scopes = SPOTIFY_CONFIG.scopes.join('%20');
  return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${SPOTIFY_CONFIG.redirectUri}&scope=${scopes}`;
};

