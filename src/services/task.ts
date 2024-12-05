import { FilterQuery, PaginateOptions } from "mongoose";
import { infoLogger , errorLogger , dataLogger } from "../core/logger";


import { taskDocument , taskModel} from "../models/task";


export const createTask = async (data : taskDocument) => {
    try {
        infoLogger("START:- save function in task service");
        const result = await taskModel.create(data);
        dataLogger("result of save", result);
        return result;
    } catch (error) {
        errorLogger("error in save function in task service", error);
        throw error;
    }
}

export const findOneTask = async (filter : FilterQuery<taskDocument>) => {
    try {
        infoLogger("START:- findOne function in task service");
        const result = await taskModel.findOne(filter);
        dataLogger("result of findOne", result);
        return result;
    } catch (error) {
        errorLogger("error in findOne function in task service", error);
        throw error;
    }
}



export const paginateTask = async (filter : FilterQuery<taskDocument> , option : PaginateOptions) => {
    try {
        infoLogger("START:- paginate function in task service");
        const result = await taskModel.paginate(filter , option);
        dataLogger("result of paginate", result);
        return result;
    } catch (error) {
        errorLogger("error in paginate function in task service", error);
        throw error;
    }
};

export const updateTask = async (filter : FilterQuery<taskDocument> , payload : taskDocument) => {
    try {
        infoLogger("START:- update function in task service");
        const result = await taskModel.findOneAndUpdate(filter , payload , {new : true});
        dataLogger("result of update", result);
        return result;
    } catch (error) {
        errorLogger("error in update function in task service", error);
        throw error;
    }
};


export const deleteTask = async (filter : FilterQuery<taskDocument>) => {
    try {
        infoLogger("START:- delete function in mongoose service");
        const result = await taskModel.findOneAndDelete(filter);
        dataLogger("result of delete", result);
        return result;
    } catch (error) {
        errorLogger("error in delete function in mongoose service", error);
        throw error;
    }
}