import UserModel from "../models/userModel.js";


//register user
export const registerUser = async(req, res) => {
    const {username, password, firstname, lastname} = req.body;
    const newUser = new UserModel({username, password, firstname, lastname})

    try {
        await newUser.save()
        res.status(200).json(newUser)

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

       validity ? res.status(200).json(user) : res.status(400).json("invalid credentials")
    }
    else{
      res.status(404).json("User does not exist")
    }
    
   } catch (error) {
    res.status(500).json({message: error.message});
    
   }
}

