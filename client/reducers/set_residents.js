/**
 * Created by jj on 12/24/16.
 */

const defaultState = [];

export default function setResidents(state=defaultState, action={})
{
    const { type, residents } = action;

    switch (type) {

        case 'SET_RESIDENTS':
            return residents;

        default:
            return state;
    }
};