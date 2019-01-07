import { all } from 'redux-saga/effects'
import { watchChangeUsers } from './userSagas'
import { watchRegisterUsers} from './registerSagas'
 
 function* rootSaga(){
     yield all([
        watchChangeUsers(),
        watchRegisterUsers()
     ])
 }

 export default rootSaga;