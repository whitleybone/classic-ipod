/**
 * Format seconds to MM:SS display
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Format milliseconds to seconds
 */
export const msToSeconds = (ms: number): number => {
  return Math.floor(ms / 1000);
};

/**
 * Debounce function for gesture handling
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
};

/**
 * Throttle function for scroll events
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

/**
 * Calculate angle between two points
 */
export const calculateAngle = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number => {
  return Math.atan2(y2 - y1, x2 - x1);
};

/**
 * Normalize angle difference to handle wrapping
 */
export const normalizeAngleDiff = (diff: number): number => {
  if (diff > Math.PI) {
    return diff - 2 * Math.PI;
  } else if (diff < -Math.PI) {
    return diff + 2 * Math.PI;
  }
  return diff;
};

/**
 * Get a default track object
 */
export const getDefaultTrack = () => ({
  id: 'default',
  name: 'No Track',
  artist: 'Unknown Artist',
  album: 'Unknown Album',
  albumArt: '',
  uri: '',
  duration: 0,
});

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength - 3) + '...';
};

