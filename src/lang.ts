import strings from "../src/components/language"
import { AsyncStorage } from "react-native";

class Translate {
    constructor() {
        this.language()
    }

    language = async() => {
        const languageStore = await AsyncStorage.getItem("language")   
        return await strings.setLanguage(languageStore)
    }
}

const lang = new Translate()

export default lang