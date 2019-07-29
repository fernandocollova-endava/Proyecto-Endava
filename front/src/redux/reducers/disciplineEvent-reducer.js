import { RECEIVE_EVENT_LIST, RECEIVE_TECH_LIST, RECEIVE_ACTIVE_EVENT} from "../../constants"

const initialState ={
  eventList: [],
  techList:[],
  activeEvent: {}

}

export default (state = initialState, action )=>{

  
switch(action.type){
    case RECEIVE_EVENT_LIST:
  
    return {...state, eventList:action.eventList}

    case RECEIVE_TECH_LIST:
     
     return {...state, techList:action.techList}
    case RECEIVE_ACTIVE_EVENT:

        return {...state, activeEvent:action.activeEvent}
    default:
      return state
}
}

