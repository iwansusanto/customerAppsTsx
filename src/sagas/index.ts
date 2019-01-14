import { all } from 'redux-saga/effects'
import { watchChangeUsers, watchLoginUsers } from './userSagas'
import { watchRegisterUsers} from './registerSagas'
import { watchFetchOrderOngoing, watchFetchOrderHistory } from './ordersSagas'
 
 function* rootSaga(){
     yield all([
        watchChangeUsers(),
        watchLoginUsers(),
        watchRegisterUsers(),
        watchFetchOrderOngoing(),
        watchFetchOrderHistory()
     ])
 }

 export default rootSaga;