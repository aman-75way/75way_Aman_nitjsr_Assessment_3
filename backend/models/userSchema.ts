import mongoose from "mongoose";
import Jwt from "jsonwebtoken";

export interface IUser extends Document {
    name: string;
    mobile: string;
    // ... other fields
    tokens: Array<{ token: string }>;
  
    generateAuthToken(): Promise<string>;
  }

const userSchema = new mongoose.Schema({
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
        const secretKey = process.env.SECRET_KEY;

        if (!secretKey) {
            throw new Error("SECRET_KEY is not defined in the environment variables.");
        }
        const token = Jwt.sign({_id : this._id , name: this.name , mobile: this.mobile} , secretKey);
        this.tokens = this.tokens.concat({token: token});
        console.log(token);
        await this.save();
        return token;
    } catch (error) {
        console.log("Error : " , error);
    }
}


// export const User = mongoose.model("User" , userSchema);
export const User: mongoose.Model<IUser> = mongoose.model<IUser>('User', userSchema);