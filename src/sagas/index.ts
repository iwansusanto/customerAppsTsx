import { all } from 'redux-saga/effects'
import { watchChangeUsers, watchLoginUsers } from './userSagas'
import { watchRegisterUsers} from './registerSagas'
import { watchGetCategory } from './getCategoriesSagas'
import { watchSuggestion } from './suggestionSagas'
import { watchPickCategories } from './pickCategoriesSagas'
 
 function* rootSaga(){
     yield all([
        watchChangeUsers(),
        watchGetCategory(),
        watchRegisterUsers(),
        watchLoginUsers(),
        watchSuggestion(),
        watchPickCategories()
     ])
 }

 export default rootSaga;