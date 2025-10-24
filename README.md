# ✨ Classic iPod ✨

A beautiful React Native iPod music player app with Spotify integration and customizable color themes.

## 🎨 Features

- **Classic iPod Interface** - Nostalgic iPod design with click wheel navigation
- **9 Color Themes** - Customize your iPod with Classic White, Black, Pink, Hot Pink, Blue, Green, Product RED, Purple, and Orange
- **Demo Mode** - Try the app with sample tracks without Spotify authentication
- **Spotify Integration** - Connect your Spotify account for full music playback
- **Beautiful UI** - Gradient backgrounds, sparkly banner, and smooth animations

## 📱 Screenshots

The app features a classic iPod screen with a functional click wheel for navigation.

## 🚀 Getting Started

### Prerequisites

- Node.js 16 or later
- iOS: Xcode 14.3+, CocoaPods
- Android: Android Studio, JDK 17

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/classic-ipod.git
cd classic-ipod
```

2. Install dependencies:
```bash
npm install
```

3. Install iOS dependencies:
```bash
cd ios && pod install && cd ..
```

### Running the App

**iOS:**
```bash
npm run ios
```

**Android:**
```bash
npm run android
```

## 🎵 Demo Mode

Launch the app and tap "Try Demo Mode" to explore the interface with sample tracks:
- Classic Rock Hits
- Throwback Jams
- Road Trip Mix

## 🔐 Spotify Setup

To use Spotify:

1. Create a Spotify Developer App at https://developer.spotify.com/dashboard
2. Set the redirect URI to: `ipodapp://callback`
3. Enter your Client ID and Client Secret in the app
4. Follow the authorization flow

## 🎨 Color Themes

Change your iPod color in Settings → iPod Color:
- Classic White
- Classic Black
- Pink
- Hot Pink (vibrant magenta)
- Blue
- Green
- Product RED
- Purple
- Orange

## 🎮 Controls

- **MENU Button (Top)**: Go back/return to menu
- **Right Button (⏭)**: Scroll down (menu) / Next track (playing)
- **Left Button (⏮)**: Scroll up (menu) / Previous track (playing)
- **Bottom Button (⏯)**: Play/Pause
- **Center Button**: Select

## 🛠️ Built With

- React Native 0.82.1
- TypeScript
- React Navigation
- react-native-track-player
- react-native-linear-gradient
- Spotify Web API

## 📝 License

This project is open source and available under the MIT License.

## 💖 Acknowledgments

Inspired by the classic Apple iPod design.
