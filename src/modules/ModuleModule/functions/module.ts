import { FilterQuery, PaginateOptions } from "mongoose";
import { errorLogger } from "../../../core/logger";
import {
  catchResponse,
  failureResponse,
  successResponse,
} from "../../../core/response";
import { moduleDocument } from "../../../models/module";
import { createModule, paginateModule } from "../../../services/module";



export const createModuleRoute = async (req: any, res: any) => {
  try {
    const body: moduleDocument = req.body;

    const { projectId , type } = body

    if (!projectId || !type) {
      const response = failureResponse({
        handler: "module",
        messageCode: "E001",
        req: req,
      });
      return res.status(response?.statusCode).send(response);
    }

    const result = await createModule(body);
    if (!result) {
      const response = failureResponse({
        handler: "module",
        messageCode: "E003",
        req: req,
      });
      return res.status(response?.statusCode).send(response);
    }
    const response = successResponse({
      handler: "module",
      messageCode: "S004",
      req: req,
      data: result,
    });
    return res.status(response?.statusCode).send(response);
  } catch (error) {
    errorLogger("error in createModule function", error);
    const response = catchResponse({
      handler: "module",
      messageCode: "E003",
      req: req,
      error: error,
    });

    return res.status(response?.statusCode).send(response);
  }
};


export const getModuleRoute = async (req: any, res: any) => {
    try {
        const { page, limit , projectId } = req.query;
        const filter = {} as FilterQuery<moduleDocument>;
        const options = {
          page: page || 1,
          limit: limit || 10,
          sort: { createdAt: -1 },
          populate: "projectId",
          lean: true,
        } as PaginateOptions;
    
        if (projectId) filter.projectId = projectId;
    
        const result = await paginateModule(filter, options);
    
        if (!result) {
          const response = failureResponse({
            handler: "module",
            messageCode: "E006",
            req: req,
          });
          return res.status(response?.statusCode).send(response);
        }
        const response = successResponse({
          handler: "module",
          messageCode: "S005",
          req: req,
          data: result,
        });
        return res.status(response?.statusCode).send(response);

        
    } catch (error) {
        errorLogger("error in getModule function", error);
        const response = catchResponse({
          handler: "module",
          messageCode: "E006",
          req: req,
          error: error,
        });
    
        return res.status(response?.statusCode).send(response);
        
    }
}