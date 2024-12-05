import { FilterQuery, PaginateOptions } from "mongoose";
import { infoLogger , errorLogger , dataLogger } from "../core/logger";
import { moduleModel  , moduleDocument} from "../models/module";


export const paginateModule = async (filter : FilterQuery<moduleDocument> , option : PaginateOptions) => {
    try {
        infoLogger("START:- paginate function in module service");
        const result = await moduleModel.paginate(filter , option);
        dataLogger("result of paginate", result);
        return result;
    } catch (error) {
        errorLogger("error in paginate function in module service", error);
        throw error;
    }
}

export const findOneModule = async (filter : FilterQuery<moduleDocument>) => {
    try {
        infoLogger("START:- findOne function in module service");
        const result = await moduleModel.findOne(filter);
        dataLogger("result of findOne", result);
        return result;
    } catch (error) {
        errorLogger("error in findOne function in module service", error);
        throw error;
    }
}

export const updateModule = async (filter : FilterQuery<moduleDocument> , payload : moduleDocument) => {
    try {
        infoLogger("START:- update function in module service");
        const result = await moduleModel.findOneAndUpdate(filter , payload , {new : true});
        dataLogger("result of update", result);
        return result;
    } catch (error) {
        errorLogger("error in update function in module service", error);
        throw error;
    }
}

export const deleteModule = async (filter : FilterQuery<moduleDocument>) => {
    try {
        infoLogger("START:- delete function in module service");
        const result = await moduleModel.findOneAndDelete(filter);
        dataLogger("result of delete", result);
        return result;
    } catch (error) {
        errorLogger("error in delete function in module service", error);
        throw error;
    }
}

export const createModule = async (data : moduleDocument) => {
    try {
        infoLogger("START:- save function in module service");
        const result = await moduleModel.create(data);
        dataLogger("result of save", result);
        return result;
    } catch (error) {
        errorLogger("error in save function in module service", error);
        throw error;
    }
};