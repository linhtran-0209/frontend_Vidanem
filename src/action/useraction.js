import axios from 'axios';
import { LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS } from '../constant/userConstant';

export const login = () => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/currentUser`);
    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOGIN_FAILED, payload: error.response.data.message });
  }
};
