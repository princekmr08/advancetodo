import Router from "express";
import { getuserdetails, logoutuser, registeruser } from "../controller/user.controller.js";
import {loginuser} from "../controller/user.controller.js";
import { verifyjwt } from "../middleware/auth.js";

const router=Router();

router.post("/register",registeruser);
router.post("/login",loginuser);
router.post("/logout",verifyjwt,logoutuser);
router.get("/details",verifyjwt,getuserdetails);


export default router;