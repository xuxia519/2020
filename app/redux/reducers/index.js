import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

import * as tabList from './tabList'
import tagsView from './tagsView'
import system from './system'
import * as common from './common'

export default combineReducers({
  tagsView,
  system
})
