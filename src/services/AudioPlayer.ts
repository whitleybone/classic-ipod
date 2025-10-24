import {Track} from '../types';

export interface AudioPlayerListener {
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onProgress: (position: number, duration: number) => void;
  onEnd: () => void;
}

class AudioPlayer {
  private currentTrack: Track | null = null;
  private isPlaying: boolean = false;
  private queue: Track[] = [];
  private currentIndex: number = 0;
  private listeners: AudioPlayerListener[] = [];
  private position: number = 0;
  private duration: number = 0;
  private audio: HTMLAudioElement | null = null;
  private progressInterval: any = null;

  constructor() {
    // For React Native, we'd use react-native-track-player
    // For now, this is a simplified version
    if (typeof Audio !== 'undefined') {
      // This would be initialized with react-native-track-player
    }
  }

  addListener(listener: AudioPlayerListener) {
    this.listeners.push(listener);
  }

  removeListener(listener: AudioPlayerListener) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  private notifyListeners(event: keyof AudioPlayerListener, ...args: any[]) {
    this.listeners.forEach(listener => {
      const handler = listener[event] as any;
      if (handler) {
        handler(...args);
      }
    });
  }

  async loadTrack(track: Track) {
    this.currentTrack = track;
    this.position = 0;
    this.duration = track.duration;
    
    // In a real implementation, you'd use react-native-track-player
    // For preview, use the preview URL if available
    if (track.previewUrl) {
      // Setup audio playback
      console.log('Loading track:', track.name);
    }
  }

  async play() {
    if (!this.currentTrack) {
      return;
    }

    this.isPlaying = true;
    this.notifyListeners('onPlay');
    
    // Start progress updates
    this.startProgressUpdates();
  }

  async pause() {
    this.isPlaying = false;
    this.notifyListeners('onPause');
    this.stopProgressUpdates();
  }

  async playPause() {
    if (this.isPlaying) {
      await this.pause();
    } else {
      await this.play();
    }
  }

  async next() {
    if (this.currentIndex < this.queue.length - 1) {
      this.currentIndex++;
      await this.loadTrack(this.queue[this.currentIndex]);
      await this.play();
      this.notifyListeners('onNext');
    }
  }

  async previous() {
    if (this.position > 3) {
      // If more than 3 seconds into track, restart
      this.position = 0;
    } else if (this.currentIndex > 0) {
      // Otherwise go to previous track
      this.currentIndex--;
      await this.loadTrack(this.queue[this.currentIndex]);
      await this.play();
    }
    this.notifyListeners('onPrevious');
  }

  setQueue(tracks: Track[], startIndex: number = 0) {
    this.queue = tracks;
    this.currentIndex = startIndex;
    if (tracks.length > 0) {
      this.loadTrack(tracks[startIndex]);
    }
  }

  async seekTo(position: number) {
    this.position = position;
    // Implement actual seeking
  }

  getState() {
    return {
      currentTrack: this.currentTrack,
      isPlaying: this.isPlaying,
      position: this.position,
      duration: this.duration,
      queue: this.queue,
      currentIndex: this.currentIndex,
    };
  }

  private startProgressUpdates() {
    this.stopProgressUpdates();
    this.progressInterval = setInterval(() => {
      if (this.isPlaying) {
        this.position += 1;
        if (this.position >= this.duration) {
          this.position = this.duration;
          this.onTrackEnd();
        }
        this.notifyListeners('onProgress', this.position, this.duration);
      }
    }, 1000);
  }

  private stopProgressUpdates() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
  }

  private onTrackEnd() {
    this.isPlaying = false;
    this.notifyListeners('onEnd');
    this.next();
  }
}

export default new AudioPlayer();

