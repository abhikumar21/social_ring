
import * as UserApi from '../api/UserRequest.js'

export const updateUser = (id, formData) => async(dispatch) => {
    dispatch({type: "UPDATING_START"})
    try {
        const {data} = await UserApi.updateUser(id, formData);
        dispatch({type: "UPDATING_SUCCESS", data: data})
    } catch (error) {
        dispatch({type: "UPDATING_FAIL"})
    }
}

export const followuser = (id, data) => async(dispatch) => {
    dispatch({type:"FOLLOW_USER", data: id})
    UserApi.followuser(id, data)
}

export const unfollowuser = (id, data) => async(dispatch) => {
    dispatch({type:"UNFOLLOW_USER", data: id})
    UserApi.unfollowuser(id, data)
}