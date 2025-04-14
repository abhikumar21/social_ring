
const postReducer = (
    state = {posts: [], loading: false, error: false, uploading: false}, 
    action
) => {
    switch(action.type) {
        //post.js
        case "UPLOAD_START": 
            return {...state, uploading: true, error: false}

        case "UPLOAD_SUCCESS": 
            return {...state, posts: [action.data, ...(state.posts || [])], uploading: false, error: false}

        case "UPLOAD_FAIL":
            return {...state, uploading: false, error: true}

            //posts.js
        case "RETRIEVING_START" :
            return { ...state, loading: true, error: false};

        case "RETRIEVING_SUCCESS" : 
            return { ...state, posts: action.data, loading: false, error: false};
            
        case "RETRIEVING_FAIL" : 
            return { ...state, loading: false, error: true};    

        case "UPDATEPOST_START" : 
            return {...state, loading: true, error: false};

        case "UPDATEPOST_SUCCESS" : 
             localStorage.setItem("profile", JSON.stringify({...action?.data}));
             return{...state, posts: action.data, updateLoading: false, error: false};

        case "UPDATEPOST_FAIL" :
            return {...state, loading: false, error: true};  
            
        case "DELETE_START" :
            return {...state, loading: true, error: false};

        case "DELETE_SUCCESS" : 
            return {...state, posts: state.posts.filter(post => post._id !== action.postId), loading: false};

        case "DELETE_FAILED" : 
             return {...state, loading: false, error: true};    

        default:
            return state;
    }
}

export default postReducer;




// const postReducer = (
//     state = {posts: [], loading: false, error: false, uploading: false}, 
//     action
// ) => {
//     switch(action.type) {
//         case "UPLOAD_START": 
//             return {...state, uploading: true, error: false}

//         case "UPLOAD_SUCCESS": 
//             return {...state, posts: [action.data, ...state.posts], uploading: false, error: false}

//         case "UPLOAD_FAILED":
//             return {...state, uploading: false, error: true }

//         default:
//             return state;
//     }
// }

// export default postReducer;