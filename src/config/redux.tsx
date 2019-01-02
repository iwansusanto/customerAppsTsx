import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'

import allReducers from '../reducers'
import rootSaga from '../sagas'

const middlewares = []
const sagaMiddleware = createSagaMiddleware()
const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, allReducers)

middlewares.push(sagaMiddleware)
if (__DEV__) {
    middlewares.push(createLogger())
}

export const store = createStore(
        persistedReducer, 
        applyMiddleware(...middlewares)
)

export const persistor = persistStore(store)
sagaMiddleware.run(rootSaga)