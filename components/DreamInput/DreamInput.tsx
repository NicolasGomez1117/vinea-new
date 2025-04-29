import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

interface DreamInputProps {
  value: string
  onChangeText: (text: string) => void
}

export default function DreamInput({ value, onChangeText }: DreamInputProps) {
  return (
    <TextInput
      style={styles.input}
      multiline
      placeholder="Type your mood…"
      value={value}
      onChangeText={onChangeText}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    textAlignVertical: 'top',
  },
})
