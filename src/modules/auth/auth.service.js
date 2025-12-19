import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "../../../lib/prisma.js";

const generateToken = (user) => {
  return jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );
};

export const registerUser = async ({ email, username, password, name }) => {
  //1. validate input
  if (!email || !username || !password) {
    throw new Error("Email, username, and password are required");
  }

  // 2. check if user already exists
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });
  if (existingUser) {
    throw new Error("Email or username already in use");
  }

  // 3. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 4. create user
  const user = await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
      name,
    },
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });
  const token = generateToken(user);
  return { user, token };
};

//login user
export const loginUser = async ({ email, username, password }) => {
  if ((!email && !username) || !password) {
    throw new Error("Email/username and password are required");
  }

  // Find user by email or username
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        email ? { email } : undefined,
        username ? { username } : undefined,
      ].filter(Boolean),
    },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  // Compare password
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  // Return safe user data
  const safeUser = {
    id: user.id,
    email: user.email,
    username: user.username,
    name: user.name,
    role: user.role,
    createdAt: user.createdAt,
  };
  const token = generateToken(safeUser);

  return {
    user: safeUser,
    token,
  };
};
