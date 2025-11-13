import { Router } from "express";
import { signupValidation, loginValidation } from "../middleware/AuthValidation.js";
import { signup, login, refreshToken, logout, logoutAll, forgotPassword, resetPassword } from "../controllers/auth.controller.js";
import ensureAuthenticated from "../middleware/Auth.js";

const router = Router();

// Public routes
router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.post("/refresh-token", refreshToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Protected routes
router.post("/logout", ensureAuthenticated, logout);
router.post("/logout-all", ensureAuthenticated, logoutAll);

export { router as default };