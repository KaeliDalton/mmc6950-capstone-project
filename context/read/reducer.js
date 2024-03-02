import * as actions from './actions'

export default function reducer(state, {action, payload}){
    switch(action){
        case actions.SEARCH_NOVELS:
            return {...state, novelSearchResults: payload}
        default:
            return state
    }
}