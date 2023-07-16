
import * as PostApi from '../api/PostRequest.js'

export const getTimelinePosts = (id) => async(dispatch) => {
    dispatch ({type: "RETRIEVING_START"})
    try {
        const {data} = await PostApi.getTimelinePosts(id);
        dispatch({ type: "RETRIEVING_SUCCESS", data: data})
    } catch (error) {
        dispatch({ type: "RETRIEVING_FAIL" });
        console.log(error);
    }
}