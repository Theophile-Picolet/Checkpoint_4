import express from "express";
import auth from "./middlewares/auth";

const router = express.Router();

/* ************************************************************************* */

// Define item-related routes
import userActions from "./modules/user/userActions";

router.get("/api/user", auth.verify, auth.checkIfAdmin, userActions.browse);
router.get("/api/user/:id", auth.verify, userActions.read);
router.post("/api/user", auth.hashPassword, userActions.add);
router.post("/api/login", auth.login);
router.put("/api/user/:id", auth.verify, auth.checkIfAdmin, userActions.edit);
router.delete(
  "/api/user/:id",
  auth.verify,
  auth.checkIfAdmin,
  userActions.destroy,
);

/* ************************************************************************* */

export default router;
