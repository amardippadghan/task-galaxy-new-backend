import { Schema, model, Document, Types, PaginateModel } from "mongoose";
import  paginate  from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
export interface taskDocument extends Document {
    TaskTitle : string;
    projectId : Types.ObjectId
    company : Types.ObjectId
    module : Types.ObjectId
    taskDescription: string
    startDate : Date
    deadline : Date
    priority : string
    imageAttachment : string
    notes : string
    assignedTo : Types.ObjectId
    taskStatus : string
    status : number

}

const taskSchema = new Schema<taskDocument>({
    TaskTitle: { type: String},
    company : { type: Schema.Types.ObjectId  , ref: "user" },
    projectId: { type: Schema.Types.ObjectId  , ref: "project" , required : true},
    module: { type: Schema.Types.ObjectId  , ref: "module" , required : true},
    taskDescription: { type: String },
    startDate: { type: Date , required : true},
    deadline: { type: Date , required : true},
    priority: { type: String },
    imageAttachment: { type: String },
    notes: { type: String },
    assignedTo: { type: Schema.Types.ObjectId  , ref: "user" },
    taskStatus: { type: String , enum : ["pending" , "ongoing" , "completed"] , default : "pending"},

    status: { type: Number, enum: [0, 1], default: 1 },
}, {
    timestamps: true
});




taskSchema.plugin(paginate);
taskSchema.plugin(aggregatePaginate);



export const taskModel =  model<taskDocument ,PaginateModel<taskDocument> >("task", taskSchema)