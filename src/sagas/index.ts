import { all } from 'redux-saga/effects'
import { watchChangeUsers, watchLoginUsers } from './userSagas'
import { watchRegisterUsers} from './registerSagas'
 
 function* rootSaga(){
     yield all([
        watchChangeUsers(),
        watchLoginUsers(),
        watchRegisterUsers()
     ])
 }

 export default rootSaga;