import logger from '../middlewares/logger'
import thunk from 'redux-thunk'
import { applyMiddleware } from 'redux'


export default applyMiddleware(
    thunk,
    logger
);