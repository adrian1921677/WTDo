import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

interface TextCommandInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: (text: string) => void;
  placeholder?: string;
}

export function TextCommandInput({
  value,
  onChangeText,
  onSubmit,
  placeholder = 'Enter your reminder...',
}: TextCommandInputProps) {
  function handleSubmit() {
    if (value.trim()) {
      onSubmit(value);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        multiline
        textAlignVertical="top"
        onSubmitEditing={handleSubmit}
      />
      <TouchableOpacity
        style={[styles.submitButton, !value.trim() && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={!value.trim()}
      >
        <Text style={styles.submitButtonText}>Parse</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    minHeight: 100,
    backgroundColor: '#fafafa',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#4A90E2',
    padding: 12,
    borderRadius: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

