import { all } from 'redux-saga/effects'
import { watchChangeUsers } from './loginSagas'
 
 function* rootSaga(){
     yield all([
        watchChangeUsers()
     ])
 }

 export default rootSaga;