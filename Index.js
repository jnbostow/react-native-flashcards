import React from 'react'
import { createStore } from 'redux'
import reducer from './reducers/cards'
import middleware from './middlewares/index'

const store = createStore(reducer, middleware)

export default store;
