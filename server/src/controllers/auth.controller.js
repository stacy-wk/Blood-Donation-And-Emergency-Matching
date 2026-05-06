import { register, login, getMe } from "../services/auth.service.js";

export const registerController = async (req, res) => {
  try {
    const result = await register(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const loginController = async (req, res) => {
  try {
    const result = await login(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getMeController = async (req, res) => {
  try {
    const result = await getMe(req.user);
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};