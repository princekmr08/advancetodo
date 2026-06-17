import Router from "express";
import { logoutuser, registeruser } from "../controller/user.controller.js";
import {loginuser} from "../controller/user.controller.js";
import { verifyjwt } from "../middleware/auth.js";

const router=Router();

router.post("/register",registeruser);
router.get("/login",loginuser);
router.get("/logout",verifyjwt,logoutuser);

export default router;