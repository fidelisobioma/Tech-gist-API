import jwt from "jsonwebtoken";
import * as authService from "./auth.service.js";

//register user
export const register = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);

    res.status(201).json({
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// login user
export const login = async (req, res, next) => {
  try {
    const user = await authService.loginUser(req.body);

    res.status(200).json({
      message: "Login successful",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const googleCallback = async (req, res) => {
  const user = req.user;

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    message: "Google login successful",
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
      role: user.role,
    },
  });
};
