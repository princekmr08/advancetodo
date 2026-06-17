import Router from "express";

import { verifyjwt } from "../middleware/auth.js";
import { createSubTodo, findsubtodo, findtodo, todocategory } from "../controller/todo.controller.js";


const router=Router();

router.post("/createcategory",verifyjwt,todocategory);
router.post("/createsubtodo/:category",verifyjwt,createSubTodo);

router.get("/alltodo",verifyjwt,findtodo);
router.get("/allsubtodo/:category",verifyjwt,findsubtodo);


export default router;