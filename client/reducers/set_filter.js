/**
 * Created by jj on 12/24/16.
 */

const defaultState = [true, false];

export default function setFilter(state = defaultState, action = {}) {

    switch (action.type) {
        case 'SET_FILTER':
            return action.isHappyList;
        default:
            return state;
    }
};