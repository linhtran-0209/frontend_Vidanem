import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
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
        case LOGIN_FAILED:
        return{
            ...state,
            isAuthenticated: false,
            user: action.payload.response.data,
        };
        default:
            return state;
        }
        
};