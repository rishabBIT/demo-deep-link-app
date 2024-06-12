import { useEffect, useState } from 'react'
import { Button, Linking, StyleSheet, Text, View } from 'react-native'

export default function App() {
  const [deepLink, setDeepLink] = useState(false)
  const [reloadIdentifier, setReloadIdentifier] = useState(0)
  const [action, setAction] = useState(0)

  const handleOpenApp = () => {
    // const appUrl = `beimagine.tech://deep-link`
    const appUrl = `exp://192.168.29.182:8081`
    const redirectAppUrl = `exp://192.168.29.182:8082`
    const playstoreAppUrl = 'market://details?id=beimagine.tech'
    const appDeepLink = `${appUrl}?action=connect&app=EastMojo&redirectUrl=${redirectAppUrl}`

    Linking.openURL(appDeepLink)
      .then((response) => {
        console.log('====================================')
        console.log(`Response : ${response}`)
        console.log('====================================')
        console.log(`Opened successfully to ${appDeepLink}`)
      })
      .catch((err) => {
        Linking.openURL(playstoreAppUrl)
        console.error('Failed to open ', err)
      })
  }

  const handleDeepLink = async ({ url }) => {
    try {
      console.log('Received deep link:', url)

      let action, app, publicKey
      const paramsArray = url.split('?')[1].split('&')

      if (paramsArray) {
        paramsArray.forEach((param) => {
          const [key, value] = param.split('=')
          if (key === 'action') {
            action = value
          } else if (key === 'app') {
            app = value
          } else if (key === 'publicKey') {
            publicKey = value
          }
        })

        console.log('Action:', action)
        console.log('App:', app)
        console.log('publicKey:', publicKey)

        setDeepLink(true)
        setAction(action)
        if (action === 'true') {
          setReloadIdentifier(reloadIdentifier + 1)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    Linking.addEventListener('url', handleDeepLink)

    Linking.getInitialURL()
      .then((url) => {
        if (url) {
          handleDeepLink({ url })
        }
      })
      .catch((err) => console.error('Error getting initial URL:', err))

    // return () => {
    //   Linking.removeEventListener('url', handleDeepLink)
    // }
  }, [])

  if (deepLink && action === 'true') {
    return (
      <View key={reloadIdentifier} style={styles.container}>
        <Text>Success</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Button onPress={handleOpenApp} title='Click' color='#841584' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
