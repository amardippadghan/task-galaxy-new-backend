import helloMessages from "../modules/HelloModule/hello.json";
import authMessages from "../modules/AuthModule/auth.json";
import userMessages from "../modules/UserModule/user.json"
import projectMessages from "../modules/ProjectModule/project.json"
import deparmentMessages from "../modules/DeparmentModule/deparment.json"
import moduleMessages from "../modules/ModuleModule/module.json"

const messageCode: Record<string, any> = {
  hello: helloMessages,
  auth: authMessages,
  user : userMessages,
  project : projectMessages,
  deparment : deparmentMessages,
  module : moduleMessages

};

export default messageCode;