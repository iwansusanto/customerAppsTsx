import { all } from 'redux-saga/effects'
import { watchChangeUsers, watchLoginUsers } from './userSagas'
import { watchRegisterUsers} from './registerSagas'
import { watchGetCategory } from './getCategoriesSagas'
import { watchSuggestion } from './suggestionSagas'
 
 function* rootSaga(){
     yield all([
        watchChangeUsers(),
        watchGetCategory(),
        watchRegisterUsers(),
        watchLoginUsers(),
        watchSuggestion()
     ])
 }

 export default rootSaga;