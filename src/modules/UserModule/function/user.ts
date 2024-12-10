import { errorLogger } from "../../../core/logger"
import { catchResponse, successResponse } from "../../../core/response"


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
        const response = catchResponse({ handler: "user", messageCode: "E002", req: req, error: error });

        return res.status(response?.statusCode).send(response);


    }
}