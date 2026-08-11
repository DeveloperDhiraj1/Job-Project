import express from "express";
import {addCompanycontroller} from "./company.controller.js";
import {roleMiddleware} from "../../../middleware/roleMiddleware.js";
import {upload} from "../../../utils/common.js";
import {isAuthenticated} from "../../../auth/isAuthentication.js";
const companyRouter = express.Router();
companyRouter.post("/register", isAuthenticated, roleMiddleware(["User"]), upload.single("file"), addCompanycontroller);
export default companyRouter;