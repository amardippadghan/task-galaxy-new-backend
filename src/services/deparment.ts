import { FilterQuery, PaginateOptions } from "mongoose";
import { infoLogger , errorLogger , dataLogger } from "../core/logger";
import { deparmentModel , departmentDocument } from "../models/deparment";



export const createDepartment = async (data : departmentDocument) => {
    try {
        infoLogger("START:- save function in deparment service");
        const result = await deparmentModel.create(data);
        dataLogger("result of save", result);
        return result;
    } catch (error) {
        errorLogger("error in save function in deparment service", error);
        throw error;
    }
};


export const deleteDepartment = async (filter : FilterQuery<departmentDocument>) => {
    try {
        infoLogger("START:- delete function in deparment service");
        const result = await deparmentModel.findOneAndDelete(filter);
        dataLogger("result of delete", result);
        return result;
    } catch (error) {
        errorLogger("error in delete function in deparment service", error);
        throw error;
    }
};


export const findOneDeparment = async (filter : FilterQuery<departmentDocument>) => {
    try {
        infoLogger("START:- findOne function in deparment service");
        const result = await deparmentModel.findOne(filter);
        dataLogger("result of findOne", result);
        return result;
    } catch (error) {
        errorLogger("error in findOne function in deparment service", error);
        throw error;
    }
};

export const paginateDeparment = async (filter : FilterQuery<departmentDocument> , option : PaginateOptions) => {
    try {
        infoLogger("START:- paginate function in deparment service");
        const result = await deparmentModel.paginate(filter , option);
        dataLogger("result of paginate", result);
        return result;
    } catch (error) {
        errorLogger("error in paginate function in deparment service", error);
        throw error;
    }
    
};


export const updateDeparment = async (filter : FilterQuery<departmentDocument> , payload : departmentDocument) => {
    try {
        infoLogger("START:- update function in deparment service");
        const result = await deparmentModel.findOneAndUpdate(filter , payload , {new : true});
        dataLogger("result of update", result);
        return result;
    } catch (error) {
        errorLogger("error in update function in deparment service", error);
        throw error;
    }
    
};