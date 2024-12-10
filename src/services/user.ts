import { FilterQuery, PaginateOptions } from "mongoose";
import { infoLogger , errorLogger , dataLogger } from "../core/logger";
import {UserModel ,  userDocument } from "../models/user";

export const userService = {
    updateUser: async (filter: any, body: any) => {
        infoLogger("START:- updateUser function");
        try {
            const result  : userDocument= await UserModel.findOneAndUpdate(filter, body, { new: true }).select('-password');
            return result;
            
        } catch (error) {
            errorLogger("error in updateUser function", error);
            throw error;
            
        }
    },


    paginateUser : async (filter : any , options : PaginateOptions) => {
        infoLogger("START:- get user  function");
        try {
            
            const result = await UserModel.paginate(filter, options);
            return result;
            
        } catch (error) {
            errorLogger("error in updateUser function", error);
            throw error;
            
        }
    } 
    
};



