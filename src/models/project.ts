import { Schema, model, Document, Types, PaginateModel } from "mongoose";
import  paginate  from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";



export interface projectDocument extends Document {
    projectTitle : string;
    description : string;
    company : Types.ObjectId
    startDate : string;
    deadline : string;
    priority : string;
    image : string;
    attachment : string;
    status: number;
    createdBy : Types.ObjectId;
}


const projectSchema = new Schema<projectDocument>({
    projectTitle: { type: String , required : true},
    company : { type: Schema.Types.ObjectId  , ref: "company" },
    description: { type: String },
    startDate: { type: String , required : true},
    deadline: { type: String , required : true},
    priority: { type: String },
    image: { type: String },
    attachment: { type: String },
    status: { type: Number, enum: [0, 1], default: 1 },
    createdBy: { type: Schema.Types.ObjectId  , ref: "user" },
}, {
    timestamps: true
});


projectSchema.plugin(paginate);
projectSchema.plugin(aggregatePaginate);

export const projectModel =  model<projectDocument ,PaginateModel<projectDocument> >("project", projectSchema)