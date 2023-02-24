import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
}from "../constant/userConstant";


export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case LOGIN_SUCCESS:
            return{
                ...state,
                isAuthenticated: true,
                user: action.payload.currentsUser,
            };
        default:
            return state;
        }
        
};