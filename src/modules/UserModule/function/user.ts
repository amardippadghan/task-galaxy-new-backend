import { FilterQuery, PaginateOptions } from "mongoose"
import { errorLogger } from "../../../core/logger"
import { catchResponse, failureResponse, successResponse } from "../../../core/response"
import { userDocument } from "../../../models/user"
import { userService } from "../../../services/user"

// @ts-ignore
export const userProfile = async (req: any, res: any) => {
    try {
        const user = req.user
        const sucessResponse = successResponse({
            handler: "user",
            messageCode: "S001",
            req: req,
            data: user
        })
        return res.status(sucessResponse?.statusCode).send(sucessResponse)
    } catch (error) {
        errorLogger("error in userProfile function", error);
        // @ts-ignore
        const response = catchResponse({ handler: "user", messageCode: "E002", req: req, error: error });

        return res.status(response?.statusCode).send(response);


    }
}



export const getUserRoute = async (req: any, res: any) => {
    try {
      const { page, limit , type  } = req.query;
      const filter = {} as FilterQuery<userDocument>;
      const options = {
        page: page || 1,
        limit: limit || 10,
        sort: { createdAt: -1 },
        populate: "company",
        lean: true,
      } as PaginateOptions;
  
      filter.company = req.user.company;
      filter.type = type
  
      const result = await userService.paginateUser(filter, options);
  
      if (!result) {
        const response = failureResponse({
          handler: "user",
          messageCode: "E007",
          req: req,
        });
        return res.status(response?.statusCode).send(response);
      }
      const response = successResponse({
        handler: "user",
        messageCode: "S005",
        req: req,
        data: result,
      });
      return res.status(response?.statusCode).send(response);
    } catch (error) {
      errorLogger("error in getDeparment function", error);
      const response = catchResponse({
        handler: "user",
        messageCode: "E006",
        req: req,
        error: error,
      });
  
      return res.status(response?.statusCode).send(response);
    }
  };