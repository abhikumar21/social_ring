
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

export const deletePost = (postId, userId) => async(dispatch) => {
    dispatch({type: "DELETE_START"})
    try{
        await PostApi.deletePost(postId, userId);
        dispatch({type: "DELETE_SUCCESS", postId})
    }
    catch(error) {
        console.log(error)
        dispatch({type: "DELETE_FAILED"})
    }
}


