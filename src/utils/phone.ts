import {
  Alert,
  Linking,
  Platform
} from "react-native"


export const sendWhatsAppMessage = (link:any) => {
    Linking.canOpenURL(link)
      .then(supported => {
        if(!supported) {
          Alert.alert('Please install whats app to send direct message to students via whats app')
        } else {
          return Linking.openURL(link)
        }
      })
      .catch(err => console.error('An Error occurred', err))
}

export const callPhone = (phone:any) => {
  let phoneNumber = phone
  if(Platform.OS !== 'android') {
    phoneNumber = `telprompt:${phone}`
  } else {
    phoneNumber = `tel:${phone}`
  }

  Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if(!supported) {
          Alert.alert('Phone number is not available', phone)
        } else {
          return Linking.openURL(phoneNumber)
        }
      })
      .catch(err => console.error('An Error occurred', err))
}