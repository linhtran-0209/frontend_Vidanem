import axios from "axios";
import {
    LOGIN_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
} from "../constant/userConstant";


export const login = () => async (dispatch) => {
    try {
        dispatch ({ type: LOGIN_REQUEST}); 
        const {data} = await axios.get(
            `http://localhost:5000/api/v1/currentUser`,
        );
        dispatch ({type:LOGIN_SUCCESS, payload:data});
    } catch (error){
        dispatch ({type:LOGIN_FAILED, payload:error.response.data.message})
    }
}



