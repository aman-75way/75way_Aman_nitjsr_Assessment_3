import { User } from "../models/userSchema.js";

export const UserRegsiter = async(req,res)=>{
    const {name , mobile, gender , password , confirmPassword} = req.body;
    const existingUser = await User.findOne({name, mobile});
    if(existingUser) res.send("User exists already");
    else{
        let userData = new User({
            name,
            mobile,
            gender,
            password,
            confirmPassword
        });

        await userData.save().then(async ()=>{
            res.status(201).json({message: "User created Successfully", token: await userData.generateAuthToken() , userId : userData._id});
        }).catch((err)=>{
            console.log("Error : " , err);
            res.status(500).send('Internal Server Error');
        });
    }   
}