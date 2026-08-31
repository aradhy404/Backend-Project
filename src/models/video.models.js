import mongose ,{Schema} from "mongose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { plugin } from "mongoose";

const videoSchema = new Schema({
    videoFile:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    views:{
        type:Number,
        default:0
    },
    published:{
        type:Boolean,
        default:true
    },
    owner:{
        type:Schema.type.ObjectID,
        ref:"User"
    }
},{timestamps:true});

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongose.model("Video",videoSchema)