import { Schema, model, Document } from "mongoose";
import  paginate  from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
export interface companyDocument extends Document {
    name?: string;
    email: string;
    phone?: string;
    status: number;
}

const companySchema = new Schema<companyDocument>({
    name: { type: String},
    email: { type: String, required: true},
    phone: { type: String },
    status: { type: Number, enum: [0, 1], default: 1 },
}, {
    timestamps: true
});



companySchema.plugin(paginate);
companySchema.plugin(aggregatePaginate);



export const companyModel = model<companyDocument>("company", companySchema);