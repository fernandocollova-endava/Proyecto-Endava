import { RECEIVE_EVENT_LIST } from "../../constants"

const initialState ={
  eventList: []

}

export default (state = initialState, action )=>{

switch(action.type){

    case RECEIVE_EVENT_LIST:
  
    return {...state, eventList:action.eventList}

    default:
      return state
}
}

