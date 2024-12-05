import mongoose from "mongoose";
import { infoLogger, errorLogger, dataLogger } from "../../../core/logger";
import {
  catchResponse,
  successResponse,
  failureResponse,
} from "../../../core/response";
import mongooseService from "../../../services/mongoose";
import { UserModel } from "../../../models/user";
import { companyModel } from "../../../models/company";
import * as jwt from "jsonwebtoken";
import * as bcryptjs from "bcryptjs";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export const RegisterUser = async (req: any, res: any) => {
  try {
    let body = req.body;

    infoLogger("START:- registerUser function");
    dataLogger("req.body", req.body);
    const { email, type } = req.body;

    if (!email || !type) {
      const response = failureResponse({
        handler: "auth",
        messageCode: "E001",
        req: req,
      });
      return res.status(response?.statusCode).send(response);
    } else if (!body.password) {
      const response = failureResponse({
        handler: "auth",
        messageCode: "E019",
        req: req,
      });
      return res.status(response?.statusCode).send(response);
    }

    const existingUser = await mongooseService.findOne(UserModel, { email });

    if (existingUser) {
      const response = failureResponse({
        handler: "auth",
        messageCode: "E002",
        req: req,
      });
      return res.status(response?.statusCode).send(response);
    }

    const hashedPassword = await bcryptjs.hash(body.password, 10);
    body.password = hashedPassword;

    if (type === "company") {
      const company = new mongoose.Types.ObjectId();
      const org = {
        ...body,
        _id: company,
      };

      const user = {
        ...body,
        company: company,
      };

      const createUser = await mongooseService.save(UserModel, user);
      const createCompany = await mongooseService.save(companyModel, org);

      const token = jwt.sign(
        {
          id: createUser._id,
          email: createUser.email,
          company: createUser.company,
          phone: createUser.phone,
          type: createUser.type,
        },
        process.env.JWT_ACCESS_SECRET as string,
        { expiresIn: "1d" }
      );

      const response = successResponse({
        handler: "auth",
        messageCode: "S003",
        req: req,
        data: {
          userData: { ...createUser._doc, password: undefined },
          accessToken: token,
        },
      });

      return res.status(response?.statusCode).send(response);
    } else if (type === "employee") {
      if (!body.company) {
        const response = failureResponse({
          handler: "auth",
          messageCode: "E020",
          req: req,
        });
        return res.status(response?.statusCode).send(response);
      }
      const user = await mongooseService.save(UserModel, body);

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          company: user.company,
          phone: user.phone,
          type: user.type,
        },
        process.env.JWT_ACCESS_SECRET as string,
        { expiresIn: "1d" }
      );

      const response = successResponse({
        handler: "auth",
        messageCode: "S003",
        req: req,
        data: {
          userData: { ...user._doc, password: undefined },
          accessToken: token,
        },
      });

      return res.status(response?.statusCode).send(response);
    } else {
      const response = failureResponse({
        handler: "auth",
        messageCode: "E007",
        req: req,
      });
      return res.status(response?.statusCode).send(response);
    }
  } catch (error) {
    errorLogger("error in registerUser function", error);
    const response = catchResponse({
      handler: "auth",
      messageCode: "E011",
      req: req,
      error: error,
    });
    return res.status(response?.statusCode).send(response);
  }
};


export const LoginUser = async (req: any, res: any) => {
  try {
    infoLogger("START:- loginUser function");
    dataLogger("req.body", req.body);
    const { email, password , type } = req.body;
    if (!email || !password || !type) {
      const response = failureResponse({
        handler: "auth",
        messageCode: "E001",
        req: req,
      });
      return res.status(response?.statusCode).send(response);
    }

    const user = await mongooseService.findOne(UserModel, { email  : email , type : type });
    if (!user) {
      const response = failureResponse({
        handler: "auth",
        messageCode: "E004",
        req: req,
      });
      return res.status(response?.statusCode).send(response);
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      const response = failureResponse({
        handler: "auth",
        messageCode: "E015",
        req: req,
      });
      return res.status(response?.statusCode).send(response);
    }
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        company: user.company,
        phone: user.phone,
        type: user.type,
      },
      process.env.JWT_ACCESS_SECRET as string,
      { expiresIn: "1d" }
    );
    const response = successResponse({
      handler: "auth",
      messageCode: "S005",
      req: req,
      data: {
        userData: { ...user._doc, password: undefined },
        accessToken: token,
      },
    });
    return res.status(response?.statusCode).send(response);
  } catch (error) {
    errorLogger("error in loginUser function", error);
    const response = catchResponse({
      handler: "auth",
      messageCode: "E016",
      req: req,
      error: error,
    });
    return res.status(response?.statusCode).send(response);
  }
};
