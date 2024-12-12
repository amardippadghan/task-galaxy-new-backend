import { FilterQuery, PaginateOptions } from "mongoose";
import { USER_TYPE } from "../../../constants/types/userType";
import { errorLogger } from "../../../core/logger";
import {
    catchResponse,
    failureResponse,
    successResponse,
} from "../../../core/response";
import { projectDocument } from "../../../models/project";
import {
    findOneProject,
    paginateProject,
    saveProject
} from "../../../services/project";

export const saveProjectRoute = async (req: any, res: any) => {
  try {
    const { projectTitle,  startDate, deadline } = req.body;
     const body : projectDocument = req.body

    if (!projectTitle || !startDate || !deadline) {
      const response = failureResponse({
        handler: "project",
        messageCode: "E001",
        req: req,
      });
      return res.status(response?.statusCode).send(response);
    }
    if(req.user.type === USER_TYPE.EMPLOYEE ){
        const response = failureResponse({
          handler: "project",
          messageCode: "E010",
          req: req,
        });
        return res.status(response?.statusCode).send(response);
      }
    
    if(req.user.type !== USER_TYPE.SUPERADMIN ){
        body.company = req.user.company
    }

    body.createdBy  = req.user._id

    const result = await saveProject(req.body);

    if (!result) {
      const response = failureResponse({
        handler: "project",
        messageCode: "E003",
        req: req,
      });
      return res.status(response?.statusCode).send(response);
    }

    const response = successResponse({
      handler: "project",
      messageCode: "S004",
      req: req,
      data: result,
    });
    return res.status(response?.statusCode).send(response);
  } catch (error) {
    errorLogger("error in saveProjectRoute function", error);
    const response = catchResponse({
      handler: "project",
      messageCode: "E003",
      req: req,
      error: error,
    });
    return res.status(response?.statusCode).send(response);
  }
};

export const getProjectRoute = async (req: any, res: any) => {
  try {
    const { id, company, page, limit } = req.query;
    // if(req.user.type === USER_TYPE.EMPLOYEE ){
    //   const response = failureResponse({
    //     handler: "project",
    //     messageCode: "E011",
    //     req: req,
    //   });
    //   return res.status(response?.statusCode).send(response);
    // }
    const filter = {} as FilterQuery<projectDocument>;
    if (id) {
      const result = await findOneProject(id);
      if (!result) {
        const response = failureResponse({
          handler: "project",
          messageCode: "E006",
          req: req,
        });
        return res.status(response?.statusCode).send(response);
      }
      const response = successResponse({
        handler: "project",
        messageCode: "S005",
        req: req,
        data: result,
      });
      return res.status(response?.statusCode).send(response);
    } 
      filter.company = req.user.company || company;
    
    const options = {
      page: page || 1,
      limit: limit || 10,
      sort: { createdAt: -1 },
      populate: "company",
    } as PaginateOptions;

    const result = await paginateProject(filter, options);

    if (!result) {
      const response = failureResponse({
        handler: "project",
        messageCode: "E006",
        req: req,
      });
      return res.status(response?.statusCode).send(response);
    }

    const response = successResponse({
      handler: "project",
      messageCode: "S005",
      req: req,
      data: result,
    });
    return res.status(response?.statusCode).send(response);
  } catch (error) {
    errorLogger("error in getProjectRoute function", error);
    const response = catchResponse({
      handler: "project",
      messageCode: "E006",
      req: req,
      error: error,
    });
    return res.status(response?.statusCode).send(response);
  }
};
