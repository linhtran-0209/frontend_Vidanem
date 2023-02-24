import {createStore,combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {userReducer,} from "./reducer/useReducer";

const reducer = combineReducers ({
    user: userReducer,
});
export const initialState= {
    // user: {
    //   email: null,
    //   role: null,
    //   body: null,
    // },
  };
// middle ware
const middleware = [thunk];

// Create a store
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;