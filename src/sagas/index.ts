import { all } from 'redux-saga/effects'
import { watchChangeUsers, watchLoginUsers } from './userSagas'
import { watchRegisterUsers} from './registerSagas'
import { watchGetCategory } from './getCategoriesSagas'
import { watchSuggestion } from './suggestionSagas'
import { watchPickCategories } from './pickCategoriesSagas'
import { watchSearch, watchSearchBySuggestion, watchSearchByName} from './searchSagas'
 
 function* rootSaga(){
     yield all([
        watchChangeUsers(),
        watchGetCategory(),
        watchRegisterUsers(),
        watchLoginUsers(),
        watchSuggestion(),
        watchPickCategories(),
        watchSearch(),
        watchSearchBySuggestion(),
        watchSearchByName()
     ])
 }

 export default rootSaga;