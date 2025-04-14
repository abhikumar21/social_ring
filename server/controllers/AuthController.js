import UserModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'



//register user
export const registerUser = async(req, res) => {
    // const {username, password, firstname, lastname} = req.body;
    const newUser = new UserModel(req.body)
    // req.body.password = password;

    const {username} = req.body

    try {
        const oldUser = await UserModel.findOne({username})
        if(oldUser) {
            console.log(oldUser)
            return res.status(400).json({message: "username already registered."})
        }
 
        const user = await newUser.save()

        const token = jwt.sign({
            username: user.username, id: user._id
        },
        process.env.JWT_KEY, {
            expiresIn: '1h'
        }
        )
         console.log("me");
        res.status(200).json({user, token})

    } catch (error) {
        res.status(500).json({message: error.message})
    }

}


//login user
export const loginUser = async(req, res) => {
    const {username, password} = req.body;
   try {
    const user= await UserModel.findOne({username: username})
    if(user) {
        //    const validity= password.localeCompare(user.password)
        const validity = password===user.password;
        
        //    validity ? res.status(200).json(user) : res.status(400).json("invalid credentials")
        if(!validity) {
            res.status(400).json("Wrong Password")
        }
        else{
            //  console.log(user)
            const token = jwt.sign({username: user.username, id: user._id},
            process.env.JWT_KEY, {expiresIn: '1h'})
            res.status(200).json({user, token})
         }
    }
    else{
      res.status(404).json("User does not exist")
    }
    
   } catch (error) {
    res.status(500).json({message: error.message});
    
   }
}

