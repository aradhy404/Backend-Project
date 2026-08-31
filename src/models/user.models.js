import mongose, {Schema} from "mongose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username:{
        type:String,
        requireds:true,
        unique:true,
        lowercase:true,
        trim:true,
        idenx:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        idenx:true,
    },
    avatar:{
        type:String,
        required:true
    },
    coverImage:{
        type:String
    },
    watchHistory:[
        {
            type:Schema.type.ObjecID,
            ref:"Video"
        }
    ],
    password:{
        type:String,
        require:[true,'Password is required']
    },
    refreshToken:{
        type:String
    }
},{Timstamps:true})

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();


    this.password = bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
   return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    jwt.sign({
        _id: this._id,
        email: this.email,
        username:this.username
    },
    process.env.ACCESS_TOKEN-SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
userSchema.methods.generateRefreshToken = function(){
     jwt.sign({
        _id: this._id,

    },
    process.env.REFRESH_TOKEN-SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

export const User = mongose.model("User",userSchema)
