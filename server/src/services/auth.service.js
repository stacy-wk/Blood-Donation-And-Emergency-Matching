// server/src/services/auth.service.js

export const register = async (data) => {
  const { name, email, password, role } = data;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  return {
    message: "User registered successfully",
    user: {
      id: Date.now(),
      name,
      email,
      role: role || "DONOR",
    },
  };
};

export const login = async (data) => {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  return {
    message: "Login successful",
    token: "fake-jwt-token",
    user: {
      id: 1,
      email,
      role: "SYSTEM_ADMIN", // temp
    },
  };
};

export const getMe = async (user) => {
  if (!user) {
    throw new Error("Unauthorized");
  }

  return {
    user,
  };
};