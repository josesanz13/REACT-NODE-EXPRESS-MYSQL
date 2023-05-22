import { Router } from "express";
import { methods as UserController } from "../controllers/UserController"
import { methods as TaskController } from "../controllers/TaskController"
import { validateUserCreate, validateUserLogin } from "../validators/users.validator"
import { validateTaskCreate, validateTaskUpdate } from "../validators/task.validator"
import { validateToken } from "../helpers/jwtHelper";

const router = Router();

// Default route
router.get("/", (req, res) => {
    res.json("Api to control users");
})

// Users routes
router.post("/login", [validateUserLogin], UserController.loginUser)
router.post("/logout", [validateToken], UserController.logout)
router.post("/sign-up", validateUserCreate, UserController.createdUser)
router.get("/get-users", UserController.getUsers)
router.get("/user", [validateToken], UserController.getUser)
router.post("/create-user", validateUserCreate, UserController.createdUser)

// Tasks routes
router.get("/tasks", [validateToken], TaskController.show)
router.get("/task/:id", [validateToken], TaskController.showID)
router.post("/task/create", [validateToken, validateTaskCreate], TaskController.store)
router.put("/task/update/:id", [validateToken, validateTaskUpdate], TaskController.update)
router.delete("/task/delete/:id", [validateToken], TaskController.remove)

export default router;