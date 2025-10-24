import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import SpotifyService from '../services/SpotifyService';

interface AuthScreenProps {
  onAuthenticated: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({onAuthenticated}) => {
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [step, setStep] = useState<'config' | 'auth'>('config');

  const handleSaveConfig = async () => {
    if (!clientId || !clientSecret) {
      Alert.alert('Error', 'Please enter both Client ID and Client Secret');
      return;
    }

    await SpotifyService.initialize(clientId, clientSecret);
    setStep('auth');
  };

  const handleAuthenticate = async () => {
    if (!authCode) {
      Alert.alert('Error', 'Please enter the authorization code');
      return;
    }

    const success = await SpotifyService.authenticate(authCode);
    if (success) {
      onAuthenticated();
    } else {
      Alert.alert('Error', 'Authentication failed. Please try again.');
    }
  };

  const getAuthUrl = () => {
    const scopes = [
      'user-read-private',
      'user-read-email',
      'user-library-read',
      'user-top-read',
      'playlist-read-private',
      'playlist-read-collaborative',
    ].join('%20');

    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=ipodapp://callback&scope=${scopes}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>iPod Spotify Player</Text>
          <Text style={styles.subtitle}>Classic iPod Experience</Text>

          {step === 'config' ? (
            <View style={styles.form}>
              <Text style={styles.instructions}>
                To get started, you need to create a Spotify Developer App:
              </Text>
              <Text style={styles.step}>
                1. Go to https://developer.spotify.com/dashboard
              </Text>
              <Text style={styles.step}>2. Create a new app</Text>
              <Text style={styles.step}>
                3. Add 'ipodapp://callback' as a Redirect URI
              </Text>
              <Text style={styles.step}>
                4. Copy your Client ID and Client Secret below
              </Text>

              <Text style={styles.label}>Client ID</Text>
              <TextInput
                style={styles.input}
                value={clientId}
                onChangeText={setClientId}
                placeholder="Paste your Spotify Client ID"
                placeholderTextColor="#999"
                autoCapitalize="none"
                autoCorrect={false}
                selectTextOnFocus={true}
                editable={true}
                contextMenuHidden={false}
              />

              <Text style={styles.label}>Client Secret</Text>
              <TextInput
                style={styles.input}
                value={clientSecret}
                onChangeText={setClientSecret}
                placeholder="Paste your Spotify Client Secret"
                placeholderTextColor="#999"
                autoCapitalize="none"
                autoCorrect={false}
                selectTextOnFocus={true}
                editable={true}
                contextMenuHidden={false}
              />

              <TouchableOpacity
                style={styles.button}
                onPress={handleSaveConfig}>
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.form}>
              <Text style={styles.instructions}>
                Now you need to authorize the app:
              </Text>
              <Text style={styles.step}>
                1. Open this URL in your browser:
              </Text>
              <Text style={styles.urlText} selectable>
                {getAuthUrl()}
              </Text>
              <Text style={styles.step}>
                2. Authorize the app and copy the 'code' from the redirect URL
              </Text>
              <Text style={styles.step}>
                3. Paste the code below and tap Authenticate
              </Text>

              <Text style={styles.label}>Authorization Code</Text>
              <Text style={styles.hint}>
                Click in the box, then use Cmd+V to paste (or right-click → Paste)
              </Text>
              <TextInput
                style={[styles.input, styles.codeInput]}
                value={authCode}
                onChangeText={setAuthCode}
                placeholder="Paste authorization code here (Cmd+V)"
                placeholderTextColor="#999"
                autoCapitalize="none"
                autoCorrect={false}
                multiline
                numberOfLines={3}
                keyboardType="default"
              />

              <TouchableOpacity
                style={styles.button}
                onPress={handleAuthenticate}>
                <Text style={styles.buttonText}>Authenticate</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.backButton]}
                onPress={() => setStep('config')}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.demoSection}>
            <View style={styles.divider} />
            <Text style={styles.demoTitle}>Or Try Demo Mode</Text>
            <TouchableOpacity
              style={[styles.button, styles.demoButton]}
              onPress={onAuthenticated}>
              <Text style={styles.buttonText}>🎵 Try Demo Mode</Text>
            </TouchableOpacity>
            <Text style={styles.demoDescription}>
              Explore the iPod interface with sample tracks (no Spotify required)
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginBottom: 40,
  },
  form: {
    width: '100%',
  },
  instructions: {
    fontSize: 14,
    color: '#CCC',
    marginBottom: 15,
    lineHeight: 20,
  },
  step: {
    fontSize: 12,
    color: '#AAA',
    marginBottom: 8,
    paddingLeft: 10,
  },
  urlText: {
    fontSize: 10,
    color: '#0099FF',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
  },
  label: {
    fontSize: 14,
    color: '#FFF',
    marginBottom: 8,
    marginTop: 15,
    fontWeight: '600',
  },
  hint: {
    fontSize: 11,
    color: '#1DB954',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  input: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 15,
    fontSize: 14,
    color: '#FFF',
    borderWidth: 1,
    borderColor: '#444',
  },
  codeInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#1DB954',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  backButton: {
    backgroundColor: '#444',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  demoSection: {
    marginTop: 40,
    paddingTop: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#444',
    marginBottom: 20,
  },
  demoTitle: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: '600',
  },
  demoButton: {
    backgroundColor: '#6441A5',
  },
  demoDescription: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
});

