import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router'
import createHistory from 'history/createBrowserHistory'
import { loadTranslations, setLocale, syncTranslationWithStore, I18n } from 'react-redux-i18n'

import configureStore from './stores'
import { component } from './business/base'

import translation from 'services/i18n'

const history = createHistory()
const store = configureStore(history)

// Translation
syncTranslationWithStore(store)
I18n.setHandleMissingTranslation(key => key)

store.dispatch(loadTranslations(translation))
store.dispatch(setLocale('en'))

ReactDOM.render(
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */ }
    <ConnectedRouter history={history}>
      <Route path="/" component={component}/>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
