import { all } from 'redux-saga/effects'
import { watchChangeUsers } from './loginSagas'
import { watchRegisterUsers} from './registerSagas'
 
 function* rootSaga(){
     yield all([
        watchChangeUsers(),
        watchRegisterUsers()
     ])
 }

 export default rootSaga;