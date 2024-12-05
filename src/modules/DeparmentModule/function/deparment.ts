import { FilterQuery, PaginateOptions } from "mongoose";
import { errorLogger } from "../../../core/logger";
import {
  catchResponse,
  failureResponse,
  successResponse,
} from "../../../core/response";
import { departmentDocument } from "../../../models/deparment";
import {
  createDepartment,
  paginateDeparment,
  updateDeparment,
} from "../../../services/deparment";

export const createDepartmentRoute = async (req: any, res: any) => {
  try {
    const { departmentName, startingDate } = req.body;
    if (!departmentName || !startingDate) {
      const response = failureResponse({
        handler: "deparment",
        messageCode: "E001",
        req: req,
      });
      return res.status(response?.statusCode).send(response);
    }
    const body: departmentDocument = req.body;

    body.company = req.user.company._id

    const result = await createDepartment(body);

    if (!result) {
      const response = failureResponse({
        handler: "deparment",
        messageCode: "E003",
        req: req,
      });
      return res.status(response?.statusCode).send(response);
    }
    const response = successResponse({
      handler: "deparment",
      messageCode: "S004",
      req: req,
      data: result,
    });
    return res.status(response?.statusCode).send(response);
  } catch (error) {
    errorLogger("error in createDeparment function", error);
    const response = catchResponse({
      handler: "deparment",
      messageCode: "E003",
      req: req,
      error: error,
    });

    return res.status(response?.statusCode).send(response);
  }
};

export const getDeparmentRoute = async (req: any, res: any) => {
  try {
    const { page, limit } = req.query;
    const filter = {} as FilterQuery<departmentDocument>;
    const options = {
      page: page || 1,
      limit: limit || 10,
      sort: { createdAt: -1 },
      populate: "company",
      lean: true,
    } as PaginateOptions;

    filter.company = req.user.company;

    const result = await paginateDeparment(filter, options);

    if (!result) {
      const response = failureResponse({
        handler: "deparment",
        messageCode: "E006",
        req: req,
      });
      return res.status(response?.statusCode).send(response);
    }
    const response = successResponse({
      handler: "deparment",
      messageCode: "S005",
      req: req,
      data: result,
    });
    return res.status(response?.statusCode).send(response);
  } catch (error) {
    errorLogger("error in getDeparment function", error);
    const response = catchResponse({
      handler: "deparment",
      messageCode: "E006",
      req: req,
      error: error,
    });

    return res.status(response?.statusCode).send(response);
  }
};

export const updateDeparmentRoute = async (req: any, res: any) => {
  try {
    const { id, ...paylod } = req.body;
    if (!id) {
      const response = failureResponse({
        handler: "deparment",
        messageCode: "E012",
        req: req,
      });
      return res.status(response?.statusCode).send(response);
    }
    const result = await updateDeparment({ _id: id }, paylod);

    if (!result) {
      const response = failureResponse({
        handler: "deparment",
        messageCode: "E004",
        req: req,
      });
      return res.status(response?.statusCode).send(response);
    }
    const response = successResponse({
      handler: "deparment",
      messageCode: "S002",
      req: req,
      data: result,
    });
    return res.status(response?.statusCode).send(response);
  } catch (error) {
    errorLogger("error in updateDeparment function", error);
    const response = catchResponse({
      handler: "deparment",
      messageCode: "E004",
      req: req,
      error: error,
    });

    return res.status(response?.statusCode).send(response);
  }
};
