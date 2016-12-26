/**
 * Created by jj on 12/24/16.
 */
import { combineReducers } from 'redux';
import setResidents from './set_residents';

export default combineReducers({
    residents: setResidents
});