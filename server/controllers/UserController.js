import UserModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
//1:15


export const getAllUsers = async(req, res) => {
    try {
        let users = await UserModel.find();
        users = users.map((user)=> {
            const {password, ...otherDetails} = user._doc;
            return otherDetails;
        })
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error);
    }
}

//git a user
export const getUser = async(req, res) => {
    const id= req.params.id;

    try {
        const user = await UserModel.findById(id);

        if(user) {
            const {password, ...otherDetails} = user._doc
            res.status(200).json(otherDetails);
            // res.status(200).json(user)
        }
        else{
            res.json(404).json("No such user exists")
        }

     } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//update a user
export const updateUser = async(req, res) => {
    const id= req.params.id
    const {_id} = req.body
    if(id==_id) {
        try {
            const user = await UserModel.findByIdAndUpdate(id, req.body, {new: true})
            const token = jwt.sign({
                username: user.username, id: user._id
            },
            process.env.JWT_KEY, {expiresIn: '1hr'}
            )
            res.status(200).json({user, token})
        } catch (error) {
            res.status(500).json(error)  
        }   
    }
    else{
        res.status(403).json("Access Denied! you can only update your own profile.")
    }
};


//deleteuser
export const deleteuser = async(req, res) => {
    const id= req.params.id;
    
    const {currentUserId, currentUserAdminStatus} = req.body;

    if(id===currentUserId || currentUserAdminStatus) {
        try {
            const user = await UserModel.findByIdAndDelete(id);
            res.status(200).json("User deleted successfully")
            
        } catch (error) {
            res.status(500).json(error);
            
        }
    }
    else{
        res.status(403).json("Access denied! you can only delete your own profile")
    }

};


//followuser
export const followuser = async(req, res) => {
    const id= req.params.id; //who is to be followed

    const {_id} = req.body;  //who wants to follow
    if(_id===id) {
       res.status(403).json("Action forbidden")
    }
    else{
        try {
            const followUser = await UserModel.findById(id)
            const followingUser = await UserModel.findById(_id)

            if(!followUser.followers.includes(id)) {
                await followUser.updateOne({$push : {followers: _id}})
                await followingUser.updateOne({$push : {following: id}})
                res.status(200).json("User followed")
            }
            else{
                res.status(403).json("user is already followed by you")
            }

        } catch (error) {
            res.status(500).json(error)
            
        }
    }
}

//unfollow user
export const unfollowuser = async(req, res) => {
    const id= req.params.id; //who is to be followed

    const {_id} = req.body;  // who wants to follow
    if(_id===id) {
       res.status(403).json("Action forbidden")
    }
    else{
        try {
            const followUser = await UserModel.findById(id)
            const followingUser = await UserModel.findById(_id)

            if(followUser.followers.includes(_id)) {
                await followUser.updateOne({$pull : {followers: _id}})
                await followingUser.updateOne({$pull : {following: id}})
                res.status(200).json("User unfollowed")
            }
            else{
                res.status(403).json("user not followed by you")
            }

        } catch (error) {
            res.status(500).json(error)
            
        }
    }


}