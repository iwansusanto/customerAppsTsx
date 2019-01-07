import { all } from 'redux-saga/effects'
import { watchChangeUsers } from './userSagas'
import { watchRegisterUsers} from './registerSagas'
import { watchGetCategory } from './getCategoriesSagas'
 
 function* rootSaga(){
     yield all([
        watchChangeUsers(),
        watchRegisterUsers(),
        watchGetCategory()
     ])
 }

 export default rootSaga;