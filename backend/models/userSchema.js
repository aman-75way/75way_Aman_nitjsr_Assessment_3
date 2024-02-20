import mongoose from "mongoose";
import Jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    confirmPassword:{
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})


userSchema.methods.generateAuthToken = async function(){
    try {
        const token = Jwt.sign({_id : this._id , name: this.userName , mobile: this.number} , process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        console.log(token);
        await this.save();
        return token;
    } catch (error) {
        console.log("Error : " , error);
    }
}


export const User = mongoose.model("User" , userSchema);