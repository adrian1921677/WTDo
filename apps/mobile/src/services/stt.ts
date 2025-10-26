import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.apiUrl || 'http://localhost:3000';

export async function transcribeAudio(audioUri: string): Promise<string> {
  try {
    // Create FormData
    const formData = new FormData();
    formData.append('audio', {
      uri: audioUri,
      type: 'audio/m4a',
      name: 'recording.m4a',
    } as any);

    // Call Whisper API
    const response = await fetch(`${API_URL}/api/stt/whisper`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to transcribe audio');
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error('Failed to transcribe:', error);
    
    // Fallback demo text
    return 'morgen 8 uhr zahnarzt';
  }
}

