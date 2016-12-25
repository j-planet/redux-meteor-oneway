/**
 * Created by jj on 12/24/16.
 */

import { applyMiddleware, createStore, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Tracker } from 'meteor/tracker';

import rootReducer from '../reducers/rootReducer';
import { ResidentsCollection } from '../../collections/residents';


const preloaded_state = {};
// const preloaded_state = {isHappyList: [true, false]};

const store = createStore(rootReducer, preloaded_state, compose(applyMiddleware(ReduxThunk)));

Tracker.autorun(() => {

    console.log('hit AUTORUN!');
    if (store.getState().residentsNhandle.handle
        && store.getState().residentsNhandle.originator != 'store')
        store.getState().residentsNhandle.handle.stop();

    const handle = Meteor.subscribe('residents.byMood', store.getState().isHappyList);

    store.dispatch({
        type: 'SET_RESIDENTS',
        handle: handle,
        residents: ResidentsCollection.find().fetch(),
        originator: 'store'
    });

});

export default store;
