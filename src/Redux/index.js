import { combineReducers, createStore } from "redux";
import { logreducer } from "./reducers/logreaducer";


  //CompainreaducesReducer Function

  const appReducer = combineReducers({
      log:logreducer
  })
  

  let store = createStore(appReducer);
  
  export default store;