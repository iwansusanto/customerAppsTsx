import React, { Component } from 'react'
import { Text, View, AsyncStorage } from 'react-native'
import strings from './language/index'

interface Props {
    language: string
    styleLang: {}
    children?: any
}


export default class Lang extends Component <Props,any> {

    constructor(props: Props){
        super(props)
    }

    componentWillMount = () => {
        this._onSetLanguage()
    }

    _onSetLanguage = async() => {
        const languageStore = await AsyncStorage.getItem('language')
        return await strings.setLanguage(languageStore)
    }

  render() {
    const {language} = this.props
    let children = this.props.children || []
    return (
        <Text style={this.props.styleLang} >{strings[language]} {children.join('')}</Text>
    )
  }
}
