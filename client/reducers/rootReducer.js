/**
 * Created by jj on 12/24/16.
 */
import { combineReducers } from 'redux';
import happyFilter from './set_filter';
import setResidents from './set_residents';

export default combineReducers({
    isHappyList: happyFilter,
    residentsNhandle: setResidents
});