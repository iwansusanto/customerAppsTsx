import React, { Component } from 'react'
import { Text, View, AsyncStorage } from 'react-native'
import strings from '../components/language'

interface LanguageProps {
    language: string
}

interface State {
    language: string
}


export default class LanguageComponent extends Component <LanguageProps,State> {
    constructor(props: LanguageProps){
        super(props)
    }
    state = {
        language: this.props.language
    }

    componentWillReceiveProps(nextProps: LanguageProps){
        this.setState({language: nextProps.language})
    }

    componentWillMount = () => {
        this._onSetLanguage()
    }

    _onSetLanguage = async() => {
        const languageStore = await AsyncStorage.getItem('language')
        return await strings.setLanguage(languageStore)

    }

  render() {

    console.log('coba component', this.props.language)
    const {language} = this.props
    return (
      <View>
          <Text>{language}</Text>
          <Text>{strings.login}</Text>
      </View>
    )
  }
}
