import { Schema, model, Document, Types, PaginateModel } from "mongoose";
import  paginate  from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";


export interface departmentDocument extends Document {
    departmentName: string;
    description: string;
    company : Types.ObjectId
    startingDate: Date;
    status: number;
}


const departmentSchema = new Schema<departmentDocument>({
    departmentName: { type: String },
    description: { type: String },
    company : { type: Schema.Types.ObjectId  , ref: "company" },
    startingDate: { type: Date },
    status: { type: Number, enum: [0, 1], default: 1 },
}, {
    timestamps: true
});


departmentSchema.plugin(paginate);
departmentSchema.plugin(aggregatePaginate);



export const deparmentModel =  model<departmentDocument ,PaginateModel<departmentDocument> >("department", departmentSchema)