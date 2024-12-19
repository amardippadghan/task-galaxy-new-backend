import { FilterQuery, PaginateOptions } from "mongoose";
import { errorLogger } from "../../../core/logger";
import {
  catchResponse,
  failureResponse,
  successResponse,
} from "../../../core/response";
import { taskDocument } from "../../../models/task";
import { createTask, paginateTask, updateTask } from "../../../services/task";
import { USER_TYPE } from "../../../constants/types/userType";



export const CreateTaskRoute = async (req: any, res: any) => {
  try {


    if(req.user.type !== USER_TYPE.COMPANY){
      const response = failureResponse({
        handler: "task",
        messageCode: "E013",
        req: req,
      });
      return res.status(response?.statusCode).send(response);
    }

     req.body.company = req.user._id
     const {projectId ,module, startDate,deadline} = req.body as taskDocument

     if(!projectId || !module || !startDate || !deadline){
         const response = failureResponse({
           handler: "task",
           messageCode: "E001",
           req: req,
         });
         return res.status(response?.statusCode).send(response);
     }
    const body: taskDocument = req.body;
    const result = await createTask(body);
    if (!result) {
      const response = failureResponse({
        handler: "task",
        messageCode: "E003",
        req: req,
      });
      return res.status(response?.statusCode).send(response);
    }
    const response = successResponse({
      handler: "task",
      messageCode: "S004",
      req: req,
      data: result,
    });
    return res.status(response?.statusCode).send(response);
  } catch (error) {
    errorLogger("error in CreateTaskRoute function", error);
    const response = catchResponse({
      handler: "task",
      messageCode: "E000",
      req: req,
    });
    return res.status(response?.statusCode).send(response);
  }
};


export const getTaskRoute = async (req: any, res: any) => {
  try {
    const { page, limit , projectId , module  , company } = req.query;
    const filter = {} as FilterQuery<taskDocument>;
    const options = {
      page: page || 1,
      limit: limit || 10,
      sort: { createdAt: -1 },
      lean: true,
    } as PaginateOptions;

    if (projectId) filter.projectId = projectId;
    if (module) filter.module = module;
    if(company) filter.company = company;
    const result = await paginateTask(filter, options);

    if (!result) {
      const response = failureResponse({
        handler: "task",
        messageCode: "E006",
        req: req,
      });
      return res.status(response?.statusCode).send(response);
    }
    const response = successResponse({
      handler: "task",
      messageCode: "S005",
      req: req,
      data: result,
    });
    return res.status(response?.statusCode).send(response);
  } catch (error) {
    errorLogger("error in getTaskRoute function", error);
    const response = catchResponse({
      handler: "task",
      messageCode: "E000",
      req: req,
    });
    return res.status(response?.statusCode).send(response);
  }
}



export const updateTaskRoute = async (req: any, res: any) => {
  try {
    const { id, ...paylod } = req.body;
    if (!id) {
      const response = failureResponse({
        handler: "task",
        messageCode: "E012",
        req: req,
      });
      return res.status(response?.statusCode).send(response);
    }
    const result = await updateTask({ _id: id }, paylod);
    if (!result) {
      const response = failureResponse({
        handler: "task",
        messageCode: "E013",
        req: req,
      });
      return res.status(response?.statusCode).send(response);
    }
    const response = successResponse({
      handler: "task",
      messageCode: "S014",
      req: req,
      data: result,
    });
    return res.status(response?.statusCode).send(response);
  } catch (error) {
    errorLogger("error in updateTaskRoute function", error);
    const response = catchResponse({
      handler: "task",
      messageCode: "E000",
      req: req,
    });
    return res.status(response?.statusCode).send(response);
  }
}