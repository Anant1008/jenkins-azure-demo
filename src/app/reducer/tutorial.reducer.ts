import { Action } from '@ngrx/store'
import { Tutorial } from './../models/tutorial.model'
import * as TutorialActions from './../actions/tutorial.actions'

// Section 1
const initialState: Tutorial = {
    name: 'Initial Tutorial',
    url: 'http://google.com',
    status:false
}

// Section 2
export function reducer(state: Tutorial[] = [initialState], action: TutorialActions.Actions) {

    // Section 3
    switch(action.type) {
        case TutorialActions.ADD_TUTORIAL:
            return [...state, action.payload];
        case TutorialActions.REMOVE_TUTORIAL:
            return [...state.slice(0, action.payload), ...state.slice(action.payload + 1)];
        case TutorialActions.UPDATE_TUTORIAL:
            console.log(state[action.payload]);
            let temp:Tutorial=state[action.payload];
           // temp.status=true;
            console.log(temp);
            return [...state.slice(0,action.payload),{name:temp.name,url:temp.url,status:true},...state.slice(action.payload+1)];
        default:
            return state;
    }
}