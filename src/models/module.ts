import { Schema, model, Document, Types, PaginateModel } from "mongoose";
import  paginate  from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";



export interface moduleDocument extends Document {
    projectId : Types.ObjectId
    name : String
    description : String
    type : String
    status : number
}


const moduleSchema = new Schema<moduleDocument>({
    projectId : { type: Schema.Types.ObjectId  , ref: "project" },
    name : { type: String},
    description : { type: String },
    type : { type: String  ,  enum: ['Web', 'Mobile', 'Backend']},
    status : { type: Number, enum: [0, 1], default: 1 },
}, {
    timestamps: true
});


moduleSchema.plugin(paginate);
moduleSchema.plugin(aggregatePaginate);


export const moduleModel =  model<moduleDocument ,PaginateModel<moduleDocument> >("module", moduleSchema)