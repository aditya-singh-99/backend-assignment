import express from "express";
import { signin, signup, update } from "../controllers/controller.js";
import { isLogin } from "../middleware/isLogin.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.put("/update", isLogin, update);

export default router;
