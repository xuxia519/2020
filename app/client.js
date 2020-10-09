// import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader/root'
import '@config'
import Routes from '@configs/router.config'
import store from '@store'

const HotRoutes = hot(Routes)
ReactDOM.render(
  <Provider store={store}>
    <HotRoutes />
  </Provider>,
  document.getElementById('root'),
)
