/**
 * Created by jj on 12/24/16.
 */

export default function setResidents(residents) {

    console.log('action set_residents called', residents);
    return {
        type: 'SET_RESIDENTS',
        residents
    }
};