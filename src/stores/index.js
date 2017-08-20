import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import {routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'

import { combineSagas } from 'odem/utils/saga'

const reducers = require('../reducers')
import * as sagas from '../sagas'

const loggerMiddleware = createLogger({
  predicate: () => process.env.NODE_ENV === 'development'
})

const sagaMiddleware = createSagaMiddleware()

export default function (history, initialState) {
  const store = createStore(reducers, applyMiddleware(
    thunk,
    sagaMiddleware,
    routerMiddleware(history),
    loggerMiddleware // neat middleware that logs actions
  ),
    initialState,
    window.devToolsExtension ? window.devToolsExtension() : f => f)

  const rootSaga = combineSagas(sagas)
  sagaMiddleware.run(rootSaga)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
