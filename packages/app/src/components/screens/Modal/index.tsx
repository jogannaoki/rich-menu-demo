import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { COLORS } from '../../constants'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: COLORS.TRANSPARENT_BLACK,
  },
  modal: {
    width: 264,
    borderRadius: 5,
    backgroundColor: COLORS.WHITE,
  },
  modalLabels: {
    marginVertical: 36,
    marginHorizontal: 24,
  },
  modalDescription: {
    textAlign: 'center',
    fontSize: 16,
  },
  modalButton: {
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
  },
  modalButtonLabel: {
    fontSize: 16,
  },
})

interface Props {
  needsToShow: boolean
  description: string
  onPress: () => void
}

export default function Modal(props: Props) {
  const { needsToShow, description, onPress } = props

  if (!needsToShow) {
    return null
  }

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <View style={styles.modalLabels}>
          <Text style={styles.modalDescription}>{description}</Text>
        </View>
        <TouchableOpacity style={styles.modalButton} onPress={onPress}>
          <Text style={styles.modalButtonLabel}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
