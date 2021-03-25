import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native'
import { COLORS, FONTS } from '../../constants'
import { AuthContext, LoadingContext } from '../../../App'
import axios from 'axios'
import Modal from '../Modal/'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 23,
    fontFamily: FONTS.MAIN_FONT,
    color: COLORS.DIMGRAY,
  },
  border: {
    borderTopWidth: 1,
    borderColor: COLORS.LIGHTGRAY,
  },
  label: {
    marginTop: 16,
    marginHorizontal: 16,
    fontSize: 16,
    fontFamily: FONTS.MAIN_FONT,
  },
  input: {
    marginTop: 16,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderWidth: 1,
    borderRadius: 5,
    padding: 14,
    fontSize: 18,
    textAlign: 'left',
  },
  buttonContainer: {
    marginTop: 36,
    marginHorizontal: 16,
    height: 52,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BLACK,
  },
  button: {
    fontSize: 18,
    color: COLORS.WHITE,
  },
})

const apiUrl = process.env.REACT_APP_API_URL!

export const demoAPI = axios.create({
  baseURL: apiUrl,
})

export default function MembersCard() {
  const { idToken } = React.useContext(AuthContext)
  const { setIsCommunicating } = React.useContext(LoadingContext)

  const [registrationComplete, setRegistrationComplete] = React.useState(false)

  const memberRegistration = React.useCallback(() => {
    const fn = async () => {
      setIsCommunicating(true)
      const res = await demoAPI
        .get('/demo', {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        })
        .catch(error => console.dir(error))
      if (res) {
        console.log(res)
      }
      setIsCommunicating(false)
      setRegistrationComplete(true)
    }
    fn()
  }, [idToken, setIsCommunicating])

  const confirmation = React.useCallback(() => {
    setRegistrationComplete(false)
  }, [setRegistrationComplete])

  return (
    <View style={styles.container}>
      <Text style={styles.header}>LINE Demo App</Text>
      <View style={styles.border} />
      <Text style={styles.label}>XXXXを入力してください</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="unless-editing"
        keyboardType="default"
        textContentType="none"
        placeholder="0000000000"
      />
      <Text style={styles.label}>XXXXを入力してください</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="unless-editing"
        keyboardType="default"
        textContentType="none"
        placeholder="0000000000"
      />
      <TouchableOpacity onPress={memberRegistration} style={styles.buttonContainer}>
        <Text style={styles.button}>会員登録</Text>
      </TouchableOpacity>
      <Modal needsToShow={registrationComplete} description={'登録完了しました'} onPress={confirmation}></Modal>
    </View>
  )
}
