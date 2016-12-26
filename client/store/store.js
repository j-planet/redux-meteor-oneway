/**
 * Created by jj on 12/24/16.
 */

import { applyMiddleware, createStore, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

import rootReducer from '../reducers/rootReducer';


const preloaded_state = {};

const store = createStore(rootReducer, preloaded_state, compose(applyMiddleware(ReduxThunk)));

export default store;
