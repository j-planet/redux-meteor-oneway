/**
 * Created by jj on 12/24/16.
 */

const defaultState = {residents: [], handle: undefined};

export default function setResidents(state=defaultState, action={})
{
    switch (action.type) {
        case 'SET_RESIDENTS':
            return {
                residents: action.residents,
                handle: action.handle,
                originator: action.originator
            };
        default:
            return state;
    }
};