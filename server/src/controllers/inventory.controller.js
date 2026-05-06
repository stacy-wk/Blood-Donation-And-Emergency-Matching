import {
  getInventory,
  getBloodTypeStock,
  addStock,
  useStock,
  updateThreshold,
  getLowStockAlerts
} from "../services/inventory.service.js";

export const getInventoryController = async (req, res) => {
  res.json(await getInventory());
};

export const getStockController = async (req, res) => {
  res.json(await getBloodTypeStock(req.params.type));
};

export const addStockController = async (req, res) => {
  res.json(await addStock(req.params.type, req.body.amountMl));
};

export const useStockController = async (req, res) => {
  res.json(await useStock(req.params.type, req.body.amountMl));
};

export const alertsController = async (req, res) => {
  res.json(await getLowStockAlerts());
};