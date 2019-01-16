import { all } from 'redux-saga/effects'
import { watchChangeUsers, watchLoginUsers, watchChangeLanguage, watchRegisterUsers, watchOtpUsers } from './userSagas'
import { watchFetchOrderOngoing, watchFetchOrderHistory } from './ordersSagas'
import { watchGetCategory } from './getCategoriesSagas'
import { watchSuggestion } from './suggestionSagas'
import { watchPickCategories } from './pickCategoriesSagas'
import { watchSearch, watchSearchBySuggestion, watchSearchByName, watchSearchRestoDetail} from './searchSagas'
 
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
        watchSearchByName(),
        watchFetchOrderOngoing(),
        watchFetchOrderHistory(),
        watchChangeLanguage(),
        watchSearchRestoDetail(),
        watchOtpUsers()
     ])
 }

 export default rootSaga;