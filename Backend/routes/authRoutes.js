// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  register,
  login,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  forgotPassword,
  resetPassword,
  changePassword,
} = require("../controllers/authController");

module.exports = (upload) => {
  // Public routes
  router.post("/register", upload.single("photo"), register);
  router.post("/login", login);
  router.post("/forgot-password", forgotPassword);
  router.put("/reset-password/:token", resetPassword);

  // Protected routes (require Authorization: Bearer <token>)
  router.get("/", auth, getUsers); // GET /api/users
  router.get("/all", auth, getUsers); // GET /api/users/all
  router.get("/:id", auth, getUser); // GET /api/users/:id
  router.put("/:id", auth, upload.single("photo"), updateUser); // PUT /api/users/:id
  router.delete("/:id", auth, deleteUser); // DELETE /api/users/:id
  router.put("/auth/change-password", auth, changePassword); // PUT /api/users/auth/change-password

  return router;
};
