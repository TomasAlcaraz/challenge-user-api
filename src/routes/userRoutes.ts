import { Router } from "express";
import { UserController } from "../controllers/userController";
import { auth } from "../middleware/auth";

const router = Router();

router.get("/users", auth, UserController.getUsers);
router.post("/users", auth, UserController.createUser);
router.get("/users/:id", auth, UserController.getUserById);
router.put("/users/:id", auth, UserController.updateUser);
router.delete("/users/:id", auth, UserController.deleteUser);

export default router;
