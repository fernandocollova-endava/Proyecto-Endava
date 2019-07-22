import { RECEIVE_EVENT_LIST, RECEIVE_TECH_LIST} from "../../constants"

const initialState ={
  eventList: [],
  techList:[]

}

export default (state = initialState, action )=>{

  
switch(action.type){
    case RECEIVE_EVENT_LIST:
  
    return {...state, eventList:action.eventList}

    case RECEIVE_TECH_LIST:
     
     return {...state, techList:action.techList}

    default:
      return state
}
}

