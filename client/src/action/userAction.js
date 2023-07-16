
import * as UserApi from '../api/UserRequest.js'

export const updateUser = (id, formData) => async(dispatch) => {
    dispatch({type: "UPDATING_START"})
    try {
        const {data} = UserApi.updateUser(id, formData);
        dispatch({type: "UPDATING_SUCCESS"})
    } catch (error) {
        dispatch({type: "UPDATING_FAIL"})
    }
}