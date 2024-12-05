import { FilterQuery, PaginateOptions } from "mongoose";
import { infoLogger , errorLogger , dataLogger } from "../core/logger";

import { projectModel , projectDocument } from "../models/project";



export const saveProject = async (data: projectDocument) => {
    try {
        infoLogger("START:- save function in project service");
        const result = await projectModel.create(data);
        dataLogger("result of save", result);
        return result;
    } catch (error) {
        errorLogger("error in save function in project service", error);
        throw error;
    }
};


export const paginateProject = async (filter : FilterQuery<projectDocument> , option : PaginateOptions) => {
    try {
        infoLogger("START:- paginate function in project service");
        const result = await projectModel.paginate(filter , option);
        dataLogger("result of paginate", result);
        return result;
    } catch (error) {
        errorLogger("error in paginate function in project service", error);
        throw error;
    }
};

export const findOneProject = async (filter : FilterQuery<projectDocument>) => {
    try {
        infoLogger("START:- findOne function in project service");
        const result = await projectModel.findOne(filter);
        dataLogger("result of findOne", result);
        return result;
    } catch (error) {
        errorLogger("error in findOne function in project service", error);
        throw error;
    }
};

export const updateProject = async (filter : FilterQuery<projectDocument> , payload : projectDocument) => {
    try {
        infoLogger("START:- update function in project service");
        const result = await projectModel.findOneAndUpdate(filter , payload , {new : true});
        dataLogger("result of update", result);
        return result;
    } catch (error) {
        errorLogger("error in update function in project service", error);
        throw error;
    }
};


export const deleteProject = async (filter : FilterQuery<projectDocument>) => {
    try {
        infoLogger("START:- delete function in project service");
        const result = await projectModel.findOneAndDelete(filter);
        dataLogger("result of delete", result);
        return result;
    } catch (error) {
        errorLogger("error in delete function in project service", error);
        throw error;
    }
}